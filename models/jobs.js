const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
	title: String,
	responsibilities: [String],
	requirements: [String],
	applyLink: String,
});

module.exports = mongoose.model("Jobs", jobsSchema);
