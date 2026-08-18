const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	url: { type: String, required: true },
	created_time: { type: Date, required: true },
	post_id: { type: String, required: true },
	image_url: { type: String, default: null },
	media: [
		{
			type: { type: String, enum: ["photo", "video"], required: true },
			src: { type: String, default: null }, // image / video thumbnail URL
			source: { type: String, default: null }, // direct video file URL (videos only)
			width: { type: Number, default: null },
			height: { type: Number, default: null },
		},
	],
	attachment_type: { type: String, default: null },
	message: { type: String, default: null },
	title: { type: String, default: null },
	addedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
