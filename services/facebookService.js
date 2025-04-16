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

			const response = await axios.get(
				`https://graph.facebook.com/${this.apiVersion}/${this.pageId}/posts`,
				{
					params: {
						access_token: this.accessToken,
						limit,
						fields: "id,created_time,message,permalink_url",
					},
					timeout: 10000, // Add timeout
				}
			);

			return response.data.data;
		} catch (error) {
			// Check if error is related to authentication
			if (
				error.response?.status === 400 ||
				error.response?.status === 401 ||
				error.response?.headers?.["www-authenticate"]?.includes("invalid_request")
			) {
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
	async updatePostsDatabase(limit = 10) {
		try {
			const posts = await this.fetchPagePosts(limit);

			// If no posts were returned (could be due to API error), keep existing posts
			if (!posts || posts.length === 0) {
				console.log("No posts fetched from Facebook, keeping existing posts");
				return;
			}

			// Clear existing posts
			await Post.deleteMany({});

			// Create new post entries
			const newPosts = posts.map((post) => ({
				url: post.permalink_url,
			}));

			await Post.insertMany(newPosts);
			console.log(`Successfully updated ${newPosts.length} Facebook posts`);
		} catch (error) {
			console.error("Error updating posts database:", error);
		}
	}

	/**
	 * Validate the current access token
	 * @returns {Promise<boolean>} - Whether token is valid
	 */
	async validateToken() {
		try {
			const response = await axios.get(
				`https://graph.facebook.com/${this.apiVersion}/debug_token`,
				{
					params: {
						input_token: this.accessToken,
						access_token: this.accessToken,
					},
					timeout: 5000,
				}
			);

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
