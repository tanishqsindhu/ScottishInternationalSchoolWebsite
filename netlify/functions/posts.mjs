import { connectDb, Post } from "./_lib/db.mjs";
import { json } from "./_lib/http.mjs";

export const handler = async () => {
	try {
		await connectDb();
		const posts = await Post.find({}).sort({ created_time: -1 }).lean();
		return json(200, { posts });
	} catch (err) {
		console.error("Posts fetch error:", err);
		return json(500, { error: "Failed to load gallery posts" });
	}
};
