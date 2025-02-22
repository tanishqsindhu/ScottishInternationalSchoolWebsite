const NewsLetter = require("../models/newsLetter");

module.exports.home = (req, res) => {
	const currentPage = "publications";
	// const errorMessage='underConstruction'
	res.render("publications/HomePage", { currentPage });
};

module.exports.renderAddForm = (req, res) => {
	const currentPage = "publications";
	res.render("publications/addForm", { currentPage });
};

module.exports.add = async (req, res) => {
	const currentPage = "publications";
	const imgs = { url: req.file.path, filename: req.file.filename };
	const newsLetter = new NewsLetter({ ...req.body.newsLetter });
	newsLetter.images = imgs;
	await newsLetter.save();
	const news = await NewsLetter.find({});
	res.render("publications/HomePage", { news, currentPage });
};
