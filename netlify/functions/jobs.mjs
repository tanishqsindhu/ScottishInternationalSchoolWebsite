import { connectDb, Jobs } from "./_lib/db.mjs";
import { json } from "./_lib/http.mjs";

export const handler = async () => {
	try {
		await connectDb();
		const jobs = await Jobs.find({}).lean();
		return json(200, { jobs });
	} catch (err) {
		console.error("Jobs fetch error:", err);
		return json(500, { error: "Failed to load job openings" });
	}
};
