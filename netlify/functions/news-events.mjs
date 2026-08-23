import { connectDb, NewsArticles } from "./_lib/db.mjs";
import { json } from "./_lib/http.mjs";

export const handler = async (event) => {
	try {
		await connectDb();
		const id = event.queryStringParameters?.id;

		if (id) {
			const article = await NewsArticles.findById(id).lean();
			if (!article) return json(404, { error: "Article not found" });
			return json(200, { article });
		}

		const news = await NewsArticles.find({}).lean();
		news.sort(
			(a, b) =>
				new Date(`${b.year}-${b.month}-${b.date}`) - new Date(`${a.year}-${a.month}-${a.date}`)
		);
		return json(200, { news });
	} catch (err) {
		console.error("News fetch error:", err);
		return json(500, { error: "Failed to load news and events" });
	}
};
