const express = require("express");
const router = express.Router();
const newsLetters = require("../controllers/emailList");
const catchAsync = require("../utils/catchAsync");
const { verifyRecaptcha } = require("../middleware");

router
	.route("/")
	.get(newsLetters.renderUnsubscribeForm)
	.post(verifyRecaptcha, catchAsync(newsLetters.addEmail));

router.route("/unsubscribe").post(verifyRecaptcha, catchAsync(newsLetters.unsubscribed));

module.exports = router;
