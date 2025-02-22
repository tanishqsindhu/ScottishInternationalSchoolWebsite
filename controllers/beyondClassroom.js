module.exports.home = (req, res) => {
	const currentPage = "beyondClassroom";
	res.render("beyondClassroom/beyond-classroom", { currentPage });
};
module.exports.sports = (req, res) => {
	const currentPage = "beyondClassroom";
	res.render("beyondClassroom/sports", { currentPage });
};
module.exports.coCurricular = (req, res) => {
	const currentPage = "beyondClassroom";
	res.render("beyondClassroom/coCurricular", { currentPage });
};
