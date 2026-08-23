import axios from "axios";
import { connectDb, Post } from "./_lib/db.mjs";

// Scheduled function: syncs Facebook page posts into MongoDB every hour.
// Replaces the old node-cron scheduler (services/scheduler.js).
export const config = { schedule: "@hourly" };

const API_VERSION = "v22.0";
const PAGE_ID = process.env.FACEBOOK_PAGE_ID;
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

export const handler = async () => {
	if (!PAGE_ID || !ACCESS_TOKEN) {
		console.log("Facebook sync skipped - FACEBOOK_PAGE_ID / FACEBOOK_ACCESS_TOKEN not set");
		return { statusCode: 200 };
	}

	try {
		if (!(await validateToken())) {
			console.warn("Not fetching Facebook posts due to invalid token.");
			return { statusCode: 200 };
		}
		await connectDb();
		await updatePostsDatabase(parseInt(process.env.FACEBOOK_MAX_POSTS) || 200);
		return { statusCode: 200 };
	} catch (error) {
		console.error("Facebook sync failed:", error.message);
		return { statusCode: 500 };
	}
};

async function validateToken() {
	try {
		const response = await axios.get(`https://graph.facebook.com/${API_VERSION}/debug_token`, {
			params: { input_token: ACCESS_TOKEN, access_token: ACCESS_TOKEN },
			timeout: 5000,
		});
		const data = response.data.data;
		const isValid = data && data.is_valid === true;
		if (!isValid) {
			console.error("Facebook token validation failed:", data.error?.message || "Unknown error");
		}
		return isValid;
	} catch (error) {
		console.error("Error validating Facebook token:", error.message);
		return false;
	}
}

async function updatePostsDatabase(maxPosts = 200) {
	// Follow Graph API pagination to collect all posts (up to maxPosts)
	const posts = [];
	let nextUrl = `https://graph.facebook.com/${API_VERSION}/${PAGE_ID}/posts`;
	let params = {
		access_token: ACCESS_TOKEN,
		limit: Math.min(100, maxPosts),
		fields:
			"id,created_time,message,permalink_url,full_picture,attachments{title,type,media,url,target,description,subattachments{media,type,url,target,description}}",
	};

	while (nextUrl && posts.length < maxPosts) {
		const response = await axios.get(nextUrl, { params, timeout: 15000 });
		posts.push(...(response.data.data || []));
		nextUrl = response.data.paging?.next || null;
		params = undefined; // paging.next already contains all query params
	}
	const fetchedFullHistory = nextUrl === null;

	if (!posts || posts.length === 0) {
		console.log("No posts fetched from Facebook, keeping existing posts");
		return;
	}

	let newPostCount = 0;
	let skippedCount = 0;
	const savedIds = [];

	for (const post of posts) {
		const imageUrl = extractBestImageUrl(post);
		const media = extractMediaItems(post);
		const attachmentType = post.attachments?.data?.[0]?.type || null;
		const title = extractPostTitle(post);

		// Skip posts with nothing to display
		const rawTitle = post.attachments?.data?.[0]?.title || "";
		const isUnavailable = rawTitle.toLowerCase().includes("content isn't available");
		if (isUnavailable || (media.length === 0 && !post.message)) {
			skippedCount++;
			continue;
		}
		savedIds.push(post.id);

		const existingPost = await Post.findOne({ post_id: post.id });
		await Post.updateOne(
			{ post_id: post.id },
			{
				$set: {
					url: post.permalink_url,
					created_time: new Date(post.created_time),
					post_id: post.id,
					image_url: imageUrl,
					media,
					attachment_type: attachmentType,
					message: post.message || null,
					title,
					addedAt: existingPost ? existingPost.addedAt : new Date(),
				},
			},
			{ upsert: true }
		);
		if (!existingPost) newPostCount++;
	}

	// If we fetched the complete post history, remove posts deleted from Facebook
	if (fetchedFullHistory) {
		const removed = await Post.deleteMany({ post_id: { $nin: savedIds } });
		if (removed.deletedCount > 0) {
			console.log(`Removed ${removed.deletedCount} posts no longer on the Facebook page`);
		}
	}

	console.log(
		`Successfully processed ${posts.length} Facebook posts (${newPostCount} new, ${skippedCount} skipped)`
	);
}

function extractBestImageUrl(post) {
	if (post.full_picture) return post.full_picture;
	if (!post.attachments?.data?.length) return null;

	const attachment = post.attachments.data[0];
	if (attachment.type === "share") {
		if (attachment.media?.image) return attachment.media.image.src;
		return null;
	}
	if (["photo", "video", "album"].includes(attachment.type) && attachment.media?.image) {
		return attachment.media.image.src;
	}
	const sub = attachment.subattachments?.data?.[0];
	if (sub?.media?.image) return sub.media.image.src;
	return null;
}

function extractMediaItems(post) {
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

	const subs = attachment.subattachments?.data;
	if (subs?.length) {
		for (const sub of subs) {
			const item = toItem(sub.type, sub.media);
			if (item) items.push(item);
		}
	}
	if (items.length === 0) {
		const item = toItem(attachment.type, attachment.media);
		if (item) items.push(item);
	}
	if (items.length === 0 && post.full_picture) {
		items.push({ type: "photo", src: post.full_picture, source: null });
	}
	return items;
}

function isGenericTitle(title) {
	if (!title) return true;
	const t = title.trim().toLowerCase();
	return (
		/^(photos|videos) from .*(post|album)$/.test(t) ||
		t === "timeline photos" ||
		t === "mobile uploads" ||
		t === "cover photos" ||
		t === "profile pictures" ||
		t === "untitled album" ||
		t.includes("content isn't available")
	);
}

function extractPostTitle(post) {
	if (!post.attachments?.data?.length) return null;
	const attachment = post.attachments.data[0];

	if (attachment.title && !isGenericTitle(attachment.title)) return attachment.title;
	if (attachment.description && !isGenericTitle(attachment.description)) {
		const desc = attachment.description;
		return desc.length > 100 ? desc.substring(0, 97) + "..." : desc;
	}
	if (attachment.type === "share" && attachment.target?.name) {
		return `Shared: ${attachment.target.name}`;
	}
	return null;
}
