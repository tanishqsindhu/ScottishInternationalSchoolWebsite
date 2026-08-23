import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;

let cached = globalThis.__mongooseConn;

export async function connectDb() {
	if (!cached) {
		cached = globalThis.__mongooseConn = mongoose.connect(DB_URL, {
			serverSelectionTimeoutMS: 8000,
		});
	}
	await cached;
	return mongoose;
}

function model(name, schemaDef, options) {
	return mongoose.models[name] || mongoose.model(name, new mongoose.Schema(schemaDef, options));
}

// --- Models (ported from the old models/ directory) ---

export const Post = model("Post", {
	url: { type: String, required: true },
	created_time: { type: Date, required: true },
	post_id: { type: String, required: true },
	image_url: { type: String, default: null },
	media: [
		{
			type: { type: String, enum: ["photo", "video"], required: true },
			src: { type: String, default: null },
			source: { type: String, default: null },
			width: { type: Number, default: null },
			height: { type: Number, default: null },
		},
	],
	attachment_type: { type: String, default: null },
	message: { type: String, default: null },
	title: { type: String, default: null },
	addedAt: { type: Date, default: Date.now },
});

export const ContactUs = model("ContactUs", {
	name: String,
	email: String,
	phone: Number,
	message: String,
	branch: String,
	date: Date,
});

export const NewsArticles = model("NewsArticles", {
	title: String,
	secondaryTitle: String,
	date: String,
	month: String,
	year: Number,
	shortDescription: String,
	content: String,
	paragraph1: String,
	paragraph2title: String,
	paragraph2: String,
	paragraph3title: String,
	paragraph3: String,
	paragraph4title: String,
	paragraph4: String,
	paragraph5title: String,
	paragraph5: String,
	author: String,
	images: [{ url: String, filename: String }],
});

export const EmailList = model("EmailList", {
	email: [String],
	date: Date,
});

export const Jobs = model("Jobs", {
	title: String,
	responsibilities: [String],
	requirements: [String],
	applyLink: String,
});

export const Home = model("Home", {
	parentTestimonial: [],
});

export const ErrorLog = model("ErrorLog", {
	statusCode: String,
	message: String,
	date: Date,
	stack: String,
});
