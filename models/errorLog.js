const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ErrorLogSchema = new Schema({
	statusCode: String,
	message: String,
	date: Date,
	stack: String,
});

module.exports = mongoose.model("ErrorLog", ErrorLogSchema);
