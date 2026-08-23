import nodemailer from "nodemailer";
import { connectDb, ContactUs } from "./_lib/db.mjs";
import { json, verifyRecaptcha } from "./_lib/http.mjs";

const SCHOOL_NAME = process.env.SCHOOL_NAME || "The School";
const LOGO_URL = process.env.SCHOOL_LOGO_URL || "";

export const handler = async (event) => {
	if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

	try {
		const { user, recaptcha } = JSON.parse(event.body || "{}");
		if (!user?.name || !user?.email || !user?.message) {
			return json(400, { error: "Missing required fields" });
		}

		if (!(await verifyRecaptcha(recaptcha))) {
			return json(400, { error: "Security check failed. Please try again." });
		}

		await connectDb();
		const newContact = new ContactUs({ ...user, date: Date.now() });
		await newContact.save();

		const dateStr = newContact.date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		await transporter.sendMail({
			from: process.env.CONTACT_EMAIL_FROM || process.env.EMAIL_USERNAME,
			to: process.env.CONTACT_EMAIL_TO,
			subject: `Requested for contacting on ${SCHOOL_NAME} Website by ${newContact.name} at ${dateStr} for ${newContact.branch} Branch`,
			html: `<div style="font-family: Arial, sans-serif; max-width: 600px; background: #ffffff; padding: 20px; margin: 20px auto; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
						<div style="display: flex; justify-content: space-between; align-items: center;">
							<h2>📩 New Contact Us Form Submission</h2>
							${LOGO_URL ? `<img src="${LOGO_URL}" alt="School Logo" style="max-width: 100px; height: auto; margin-left:200px">` : ""}
						</div>
						<hr>
						<p><strong>Name:</strong> ${newContact.name}</p>
						<p><strong>Email:</strong> ${newContact.email}</p>
						<p><strong>Phone:</strong> ${newContact.phone}</p>
						<p><strong>Date:</strong> ${dateStr}</p>
						<p><strong>Message:</strong></p>
						<p>${newContact.message}</p>
						<hr>
						<p style="text-align: center; font-size: 14px; color: #999;">This email was generated automatically. Please do not reply.</p>
					</div>`,
		});

		return json(200, { message: "We have received your request and will contact you shortly" });
	} catch (err) {
		console.error("Contact form error:", err);
		return json(500, { error: "Something went wrong. Please try again later." });
	}
};
