const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomeSchema = new Schema({
	parentTestimonial: [],
});

module.exports = mongoose.model("Home", HomeSchema);
