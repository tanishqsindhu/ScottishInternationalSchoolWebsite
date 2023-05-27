const express = require('express');
const router = express.Router();
const app = express();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn,isOffice, validateStudent } = require('../middleware');
const newsAndEvents=require('../controllers/newsAndEvents');
const multer=require('multer');
const {storage} = require('../cloudinary')
const upload=multer({storage});

router.route('/')
.get(catchAsync(newsAndEvents.home));

router.route('/add')
.get(isLoggedIn,newsAndEvents.renderAddForm)
.post(upload.array('image'),catchAsync(newsAndEvents.add));

router.route('/:id')
.get(catchAsync(newsAndEvents.newsArticle))
.put(isLoggedIn,upload.array('image'),catchAsync(newsAndEvents.articleUpdate));

router.route('/:id/edit')
.get(isLoggedIn,catchAsync(newsAndEvents.articleEdit));

module.exports = router;