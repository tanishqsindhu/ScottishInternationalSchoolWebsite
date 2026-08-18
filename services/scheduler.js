const facebookService = require("./facebookService");
const cron = require("node-cron");

const Scheduler = {
	/**
	 * Start the scheduler to fetch Facebook posts periodically
	 * @param {number} intervalInMinutes - Interval in minutes
	 */
	startFacebookPostScheduler: (intervalInMinutes = 60) => {
		// Validate interval (prevent very frequent updates)
		const validInterval = Math.max(15, parseInt(intervalInMinutes));
		console.log(`Facebook post scheduler starting - Will update every ${validInterval} minutes`);

		// Update posts immediately on startup
		Scheduler.validateAndFetchPosts();

		// Schedule regular updates
		const cronExpression = `*/${validInterval} * * * *`; // Run every X minutes
		return cron.schedule(cronExpression, async () => {
			console.log(`[${new Date().toISOString()}] Running scheduled Facebook post update`);
			await Scheduler.validateAndFetchPosts();
		});
	},

	/**
	 * Validate token and then fetch posts if valid
	 */
	async validateAndFetchPosts() {
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
	},

	/**
	 * Fetch posts and handle any errors
	 */
	async fetchPosts() {
		try {
			// Fetch all posts (paginated), capped by FACEBOOK_MAX_POSTS (default 200)
			await facebookService.updatePostsDatabase(parseInt(process.env.FACEBOOK_MAX_POSTS) || 200);
		} catch (error) {
			console.error("Scheduled post fetching failed:", error);
		}
	},
};

module.exports = Scheduler;
