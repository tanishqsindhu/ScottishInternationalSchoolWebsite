const NewsLetter = require("../models/emailList");
const { cloudinary } = require("../cloudinary");

module.exports.addEmail = async (req, res) => {
	const currentPage = "emailList";
	const { email } = req.body;
	const newEmail = await NewsLetter.findOne({});
	newEmail.email.push(email);
	await newEmail.save();
	res.redirect("/", { currentPage });
};

module.exports.renderUnsubscribeForm = (req, res) => {
	const currentPage = "emailList";
	res.render("unsubscribeEmail", { currentPage });
};

module.exports.unsubscribed = async (req, res) => {
	const currentPage = "emailList";
	const email = req.body.email;
	await NewsLetter.updateOne(
		{ email },
		{
			$pull: {
				email: email,
			},
		}
	);
	req.flash("success", "GoodBye! You have been removed from our mailing list.");
	res.redirect("/", { currentPage });
};
