const facebookService = require("./facebookService");

class Scheduler {
	/**
	 * Start the scheduler to fetch Facebook posts periodically
	 * @param {number} interval - Interval in minutes
	 */
	static startFacebookPostScheduler(interval = 60) {
		// Run validation and initial fetch
		this.validateAndFetchPosts();

		// Set interval to run periodically (default: every hour)
		const intervalMs = interval * 60 * 1000;
		setInterval(() => this.validateAndFetchPosts(), intervalMs);

		console.log(`Facebook post scheduler started, running every ${interval} minutes`);
	}

	/**
	 * Validate token and then fetch posts if valid
	 */
	static async validateAndFetchPosts() {
		try {
			// First validate the token
			const isValid = await facebookService.validateToken();

			if (isValid) {
				// Only fetch posts if token is valid
				await this.fetchPosts();
			} else {
				console.warn(
					"Not fetching Facebook posts due to invalid token. Please update your Facebook access token."
				);
			}
		} catch (error) {
			console.error("Error validating Facebook token:", error);
		}
	}

	/**
	 * Fetch posts and handle any errors
	 */
	static async fetchPosts() {
		try {
			await facebookService.updatePostsDatabase(20); // Fetch 20 latest posts
		} catch (error) {
			console.error("Scheduled post fetching failed:", error);
		}
	}
}

module.exports = Scheduler;
