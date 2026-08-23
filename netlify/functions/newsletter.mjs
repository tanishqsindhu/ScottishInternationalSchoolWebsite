import { connectDb, EmailList } from "./_lib/db.mjs";
import { json, verifyRecaptcha } from "./_lib/http.mjs";

export const handler = async (event) => {
	if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

	try {
		const { email, action = "subscribe", recaptcha } = JSON.parse(event.body || "{}");
		if (!email) return json(400, { error: "Email is required" });

		if (!(await verifyRecaptcha(recaptcha))) {
			return json(400, { error: "Security check failed. Please try again." });
		}

		await connectDb();

		if (action === "unsubscribe") {
			await EmailList.updateOne({ email }, { $pull: { email } });
			return json(200, { message: "GoodBye! You have been removed from our mailing list" });
		}

		let list = await EmailList.findOne({});
		if (!list) list = new EmailList({ email: [], date: new Date() });
		if (!list.email.includes(email)) {
			list.email.push(email);
			await list.save();
		}
		return json(200, { message: "You have been subscribed to our newsletter" });
	} catch (err) {
		console.error("Newsletter error:", err);
		return json(500, { error: "Something went wrong. Please try again later." });
	}
};
