import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;

// Fail fast instead of buffering queries for 10s when not connected.
mongoose.set("bufferCommands", false);

// Module-scoped cache: each Netlify function bundle has its own mongoose
// instance, so the cache must be per-bundle (a globalThis cache would make
// one function await another bundle's connection while its own mongoose
// stays disconnected). Reused across warm invocations of the same function.
let cached = null;

export async function connectDb() {
	if (!cached) {
		cached = mongoose
			.connect(DB_URL, {
				serverSelectionTimeoutMS: 8000, // fail fast if the cluster is unreachable
				maxPoolSize: 5, // serverless: each function instance keeps a small pool
				minPoolSize: 0, // don't hold idle connections between invocations
				maxIdleTimeMS: 30000, // release unused connections quickly
			})
			.catch((err) => {
				cached = null; // allow retry on next invocation instead of caching a rejection
				throw err;
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
