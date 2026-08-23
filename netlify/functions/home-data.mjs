import { connectDb, Home, NewsArticles } from "./_lib/db.mjs";
import { json } from "./_lib/http.mjs";

export const handler = async () => {
	try {
		await connectDb();
		const [home, news] = await Promise.all([Home.findOne().lean(), NewsArticles.find({}).lean()]);
		news.sort(
			(a, b) =>
				new Date(`${b.year}-${b.month}-${b.date}`) - new Date(`${a.year}-${a.month}-${a.date}`)
		);
		return json(200, {
			parentTestimonial: home?.parentTestimonial || [],
			news,
		});
	} catch (err) {
		console.error("Home data fetch error:", err);
		return json(500, { error: "Failed to load home page data" });
	}
};
