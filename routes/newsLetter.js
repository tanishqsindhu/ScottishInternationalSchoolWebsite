const express = require('express');
const router = express.Router();
const newsLetters = require('../controllers/emailList');
const catchAsync = require('../utils/catchAsync');

router.route('/')
.get(newsLetters.renderUnsubscribeForm)
.post(catchAsync(newsLetters.addEmail));

router.route('/unsubscribe')
.post(catchAsync(newsLetters.unsubscribed));

module.exports = router;