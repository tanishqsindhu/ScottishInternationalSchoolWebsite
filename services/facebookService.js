const axios = require("axios");
const Post = require("../models/post");

class FacebookService {
	constructor() {
		this.pageId = process.env.FACEBOOK_PAGE_ID;
		this.accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
		this.apiVersion = "v22.0"; // Updated to latest version
		this.isTokenValid = true; // Track token validity
	}

	/**
	 * Fetch posts from the Facebook Page
	 * @param {number} limit - Number of posts to fetch
	 * @returns {Promise<Array>} - Array of post objects
	 */
	async fetchPagePosts(limit = 10) {
		try {
			// If token is already known to be invalid, don't attempt API call
			if (!this.isTokenValid) {
				console.log("Skipping Facebook API call - invalid token detected previously");
				return [];
			}

			const response = await axios.get(`https://graph.facebook.com/${this.apiVersion}/${this.pageId}/posts`, {
				params: {
					access_token: this.accessToken,
					limit,
					fields: "id,created_time,message,permalink_url,full_picture,attachments{title,type,media}",
					order: "chronological", // Add chronological ordering
				},
				timeout: 10000,
			});

			return response.data.data;
		} catch (error) {
			// Check if error is related to authentication
			if (error.response?.status === 400 || error.response?.status === 401 || error.response?.headers?.["www-authenticate"]?.includes("invalid_request")) {
				this.isTokenValid = false;
				console.error("Facebook API authentication error - please update your access token");
				console.error("Details:", error.response?.data?.error?.message || "Unknown auth error");
			} else {
				console.error("Error fetching Facebook posts:", error.message);
			}

			return [];
		}
	}

	/**
	 * Update the database with the latest Facebook posts
	 * @param {number} limit - Number of posts to fetch
	 * @returns {Promise<void>}
	 */
	async updatePostsDatabase(maxPosts = 200) {
		try {
			// If token is already known to be invalid, don't attempt API call
			if (!this.isTokenValid) {
				console.log("Skipping Facebook API call - invalid token detected previously");
				return;
			}

			// Follow Graph API pagination to collect all posts (up to maxPosts)
			const posts = [];
			let nextUrl = `https://graph.facebook.com/${this.apiVersion}/${this.pageId}/posts`;
			let params = {
				access_token: this.accessToken,
				limit: Math.min(100, maxPosts),
				fields: "id,created_time,message,permalink_url,full_picture,attachments{title,type,media,url,target,description,subattachments{media,type,url,target,description}}",
			};

			while (nextUrl && posts.length < maxPosts) {
				const response = await axios.get(nextUrl, { params, timeout: 15000 });
				posts.push(...(response.data.data || []));
				nextUrl = response.data.paging?.next || null;
				params = undefined; // paging.next already contains all query params
			}
			const fetchedFullHistory = nextUrl === null;

			// If no posts were returned, log and return
			if (!posts || posts.length === 0) {
				console.log("No posts fetched from Facebook, keeping existing posts");
				return;
			}

			let newPostCount = 0;
			let skippedCount = 0;
			const savedIds = [];

			for (const post of posts) {
				// Extract the image URL using a more comprehensive approach
				let imageUrl = this.extractBestImageUrl(post);

				// Extract all media items (photos and videos, including albums)
				const media = this.extractMediaItems(post);
				const attachmentType = post.attachments?.data?.[0]?.type || null;

				// Get title from post data
				let title = this.extractPostTitle(post);

				// Skip posts with nothing to display (e.g. unavailable/placeholder template posts)
				const rawTitle = post.attachments?.data?.[0]?.title || "";
				const isUnavailable = rawTitle.toLowerCase().includes("content isn't available");
				if (isUnavailable || (media.length === 0 && !post.message)) {
					skippedCount++;
					continue;
				}
				savedIds.push(post.id);

				// Check if post exists to track new posts
				const existingPost = await Post.findOne({ post_id: post.id });

				// Update or insert the post
				await Post.updateOne(
					{ post_id: post.id },
					{
						$set: {
							url: post.permalink_url,
							created_time: new Date(post.created_time),
							post_id: post.id,
							image_url: imageUrl,
							media: media,
							attachment_type: attachmentType,
							message: post.message || null,
							title: title,
							addedAt: existingPost ? existingPost.addedAt : new Date(),
						},
					},
					{ upsert: true }
				);

				if (!existingPost) {
					newPostCount++;
				}
			}

			// If we fetched the complete post history, remove posts deleted from
			// Facebook as well as previously-stored unrenderable posts
			if (fetchedFullHistory) {
				const removed = await Post.deleteMany({ post_id: { $nin: savedIds } });
				if (removed.deletedCount > 0) {
					console.log(`Removed ${removed.deletedCount} posts no longer on the Facebook page (or unrenderable)`);
				}
			}

			console.log(`Successfully processed ${posts.length} Facebook posts (${newPostCount} new, ${skippedCount} skipped)`);
		} catch (error) {
			// Check if error is related to authentication
			if (error.response?.status === 400 || error.response?.status === 401 || error.response?.headers?.["www-authenticate"]?.includes("invalid_request")) {
				this.isTokenValid = false;
				console.error("Facebook API authentication error - please update your access token");
				console.error("Details:", error.response?.data?.error?.message || "Unknown auth error");
			} else {
				console.error("Error updating posts database:", error.message);
			}
		}
	}

	/**
	 * Extract the best available image URL from a Facebook post
	 * @param {Object} post - The Facebook post object
	 * @returns {string|null} - The best available image URL or null
	 */
	extractBestImageUrl(post) {
		// Try full_picture first (often the best quality direct image)
		if (post.full_picture) {
			return post.full_picture;
		}

		// If no attachments, return null
		if (!post.attachments || !post.attachments.data || post.attachments.data.length === 0) {
			return null;
		}

		const attachment = post.attachments.data[0];

		// Handle shared posts
		if (attachment.type === "share") {
			// Try media first
			if (attachment.media && attachment.media.image) {
				return attachment.media.image.src;
			}

			// Check for target's image
			if (attachment.target && attachment.target.id) {
				// The target might have an image we can use, but we'd need another API call
				// which would exceed rate limits, so we'll just use what we have
				return null;
			}
		}

		// Handle photo, video, or album media types
		if (attachment.type === "photo" || attachment.type === "video" || attachment.type === "album") {
			if (attachment.media && attachment.media.image) {
				return attachment.media.image.src;
			}
		}

		// Check for subattachments (common in albums and multi-photo posts)
		if (attachment.subattachments && attachment.subattachments.data && attachment.subattachments.data.length > 0) {
			const subattachment = attachment.subattachments.data[0]; // Get first subattachment
			if (subattachment.media && subattachment.media.image) {
				return subattachment.media.image.src;
			}
		}

		return null;
	}

	/**
	 * Extract all media items (photos and videos) from a Facebook post,
	 * including album subattachments and direct video source URLs.
	 * @param {Object} post - The Facebook post object
	 * @returns {Array<{type: string, src: string|null, source: string|null}>}
	 */
	extractMediaItems(post) {
		const items = [];
		const attachment = post.attachments?.data?.[0];

		if (!attachment) {
			if (post.full_picture) items.push({ type: "photo", src: post.full_picture, source: null });
			return items;
		}

		const toItem = (type, media) => {
			const src = media?.image?.src || null;
			const source = media?.source || null;
			const width = media?.image?.width || null;
			const height = media?.image?.height || null;
			const isVideo = (type || "").includes("video") || !!source;
			if (isVideo) return { type: "video", src, source, width, height };
			return src ? { type: "photo", src, source: null, width, height } : null;
		};

		// Albums / multi-photo posts carry their media in subattachments
		const subs = attachment.subattachments?.data;
		if (subs && subs.length > 0) {
			for (const sub of subs) {
				const item = toItem(sub.type, sub.media);
				if (item) items.push(item);
			}
		}

		// Single photo/video posts
		if (items.length === 0) {
			const item = toItem(attachment.type, attachment.media);
			if (item) items.push(item);
		}

		// Last-resort fallback
		if (items.length === 0 && post.full_picture) {
			items.push({ type: "photo", src: post.full_picture, source: null });
		}

		return items;
	}

	/**
	 * Extract the title from a Facebook post
	 * @param {Object} post - The Facebook post object
	 * @returns {string|null} - The post title or null
	 */
	/**
	 * Check whether a title is a generic Facebook auto-generated one
	 * (e.g. "Photos from The Scotts International School's post", "Timeline photos")
	 * @param {string} title
	 * @returns {boolean}
	 */
	isGenericTitle(title) {
		if (!title) return true;
		const t = title.trim().toLowerCase();
		return (
			/^(photos|videos) from .*(post|album)$/.test(t) ||
			t === "the scotts international school - formerly scottish" || // bare page name
			t === "timeline photos" ||
			t === "mobile uploads" ||
			t === "cover photos" ||
			t === "profile pictures" ||
			t === "untitled album" ||
			t.includes("content isn't available")
		);
	}

	extractPostTitle(post) {
		// Try to get a good title

		// If no attachments, return null
		if (!post.attachments || !post.attachments.data || post.attachments.data.length === 0) {
			return null;
		}

		const attachment = post.attachments.data[0];

		// Try attachment title first (skip generic auto-generated titles)
		if (attachment.title && !this.isGenericTitle(attachment.title)) {
			return attachment.title;
		}

		// Try attachment description next
		if (attachment.description && !this.isGenericTitle(attachment.description)) {
			// Truncate description if it's too long to be a title
			const desc = attachment.description;
			return desc.length > 100 ? desc.substring(0, 97) + "..." : desc;
		}

		// For shared posts, try to get the name of what's being shared
		if (attachment.type === "share" && attachment.target && attachment.target.name) {
			return `Shared: ${attachment.target.name}`;
		}

		return null;
	}

	/**
	 * Validate the current access token
	 * @returns {Promise<boolean>} - Whether token is valid
	 */
	async validateToken() {
		try {
			const response = await axios.get(`https://graph.facebook.com/${this.apiVersion}/debug_token`, {
				params: {
					input_token: this.accessToken,
					access_token: this.accessToken,
				},
				timeout: 5000,
			});

			const data = response.data.data;
			const isValid = data && data.is_valid === true;
			this.isTokenValid = isValid;

			if (!isValid) {
				console.error("Facebook token validation failed:", data.error?.message || "Unknown error");
			}

			return isValid;
		} catch (error) {
			console.error("Error validating Facebook token:", error.message);
			this.isTokenValid = false;
			return false;
		}
	}
}

module.exports = new FacebookService();
