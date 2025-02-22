module.exports.academics = (req, res) => {
	const currentPage = "accomplishments";
	// const errorMessage='underConstruction'
	res.render("accomplishments/academics", { currentPage });
};
module.exports.sports = (req, res) => {
	const currentPage = "accomplishments";
	// const errorMessage='underConstruction'
	res.render("accomplishments/sports", { currentPage });
};
module.exports.coCurricular = (req, res) => {
	const currentPage = "accomplishments";
	// const errorMessage='underConstruction'
	res.render("accomplishments/coCurricular", { currentPage });
};
