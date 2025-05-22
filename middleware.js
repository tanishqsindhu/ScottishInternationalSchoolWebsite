const { studentSchema, orderSchema } = require("./schemas.js");
const ExpressError = require("./utils/ExpressError");

const User = require("./models/user");

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.session.returnTo = req.originalUrl;
		req.flash("error", "You must be signed in first!");
		return res.redirect("/login");
	}
	next();
};

module.exports.validateStudent = (req, res, next) => {
	const { error } = studentSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.isArticleEditor = async (req, res, next) => {
	if (!req.user.role.includes("articlesEditor")) {
		req.session.returnTo = req.originalUrl;
		req.flash("error", "You do not have permission to do that!");
		return res.redirect(`/`);
	}
	next();
};
module.exports.isAdmin = async (req, res, next) => {
	if (!req.user.role.includes("admin")) {
		req.session.returnTo = req.originalUrl;
		req.flash("error", "You do not have permission to do that!");
		return res.redirect(`/`);
	}
	next();
};
module.exports.isMess = async (req, res, next) => {
	if (!(req.user.role == "admin" || req.user.role == "mess")) {
		req.session.returnTo = req.originalUrl;
		req.flash("error", "You do not have permission to do that!");
		return res.redirect(`/`);
	}
	next();
};

module.exports.validateOrder = (req, res, next) => {
	const { error } = orderSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

const axios = require("axios");

module.exports.verifyRecaptcha = async (req, res, next) => {
	try {
		// Get the recaptcha response from the form submission
		const recaptchaResponse = req.body["g-recaptcha-response"];

		// If there's no recaptcha response, show error
		if (!recaptchaResponse) {
			req.flash("error", "reCAPTCHA verification failed. Please try again.");
			return res.redirect(req.get("referer") || "/");
		}

		// Verify the recaptcha response with Google
		const recaptchaVerification = await axios.post(
			"https://www.google.com/recaptcha/api/siteverify",
			null,
			{
				params: {
					secret: process.env.RECAPTCHA_SECRET_KEY,
					response: recaptchaResponse,
				},
			}
		);

		// For v3, check the score (0.0 to 1.0, where 1.0 is very likely a good interaction)
		if (
			!recaptchaVerification.data.success ||
			recaptchaVerification.data.score < 0.5 // Adjust this threshold as needed
		) {
			console.log("reCAPTCHA failed with score:", recaptchaVerification.data.score);
			req.flash("error", "Security check failed. Please try again.");
			return res.redirect(req.get("referer") || "/");
		}

		// If verification succeeded, continue
		next();
	} catch (error) {
		console.error("reCAPTCHA verification error:", error);
		req.flash("error", "Error verifying security check. Please try again later.");
		return res.redirect(req.get("referer") || "/");
	}
};
