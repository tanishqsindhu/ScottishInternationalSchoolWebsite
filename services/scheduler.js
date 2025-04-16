// const facebookService = require("./facebookService");
// const cron = require("node-cron");

// const Scheduler = {
// 	/**
// 	 * Start the scheduler to fetch Facebook posts periodically
// 	 * @param {number} interval - Interval in minutes
// 	 */
// 	startFacebookPostScheduler: (intervalInMinutes = 60) => {
// 		// Facebook post fetching has been disabled as per user request.
// 		// Uncomment the code below if you want to re-enable it in the future.
		
// 		/*
// 		// Validate interval (prevent very frequent updates)
// 		const validInterval = Math.max(15, parseInt(intervalInMinutes));
// 		console.log(`Facebook post scheduler starting - Will update every ${validInterval} minutes`);
		
// 		// Update posts immediately on startup
// 		facebookService.updatePostsDatabase().catch(err => 
// 			console.error("Error during initial Facebook post update:", err)
// 		);
		
// 		// Schedule regular updates
// 		const cronExpression = `*/${validInterval} * * * *`; // Run every X minutes
// 		return cron.schedule(cronExpression, async () => {
// 			console.log(`[${new Date().toISOString()}] Running scheduled Facebook post update`);
// 			try {
// 				await facebookService.updatePostsDatabase();
// 			} catch (error) {
// 				console.error("Scheduled Facebook post update failed:", error);
// 			}
// 		});
// 		*/
		
// 		console.log('Facebook post fetching has been disabled.');
// 		return null;
// 	},

// 	/**
// 	 * Validate token and then fetch posts if valid
// 	 */
// 	async validateAndFetchPosts() {
// 		try {
// 			// First validate the token
// 			const isValid = await facebookService.validateToken();

// 			if (isValid) {
// 				// Only fetch posts if token is valid
// 				await this.fetchPosts();
// 			} else {
// 				console.warn(
// 					"Not fetching Facebook posts due to invalid token. Please update your Facebook access token."
// 				);
// 			}
// 		} catch (error) {
// 			console.error("Error validating Facebook token:", error);
// 		}
// 	},

// 	/**
// 	 * Fetch posts and handle any errors
// 	 */
// 	async fetchPosts() {
// 		try {
// 			await facebookService.updatePostsDatabase(20); // Fetch 20 latest posts
// 		} catch (error) {
// 			console.error("Scheduled post fetching failed:", error);
// 		}
// 	}
// };

// module.exports = Scheduler;
