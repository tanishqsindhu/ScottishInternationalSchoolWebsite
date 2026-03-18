const express = require('express');
const router = express.Router();
const app = express();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn,isArticleEditor, validateStudent,isAdmin,validateArticle } = require('../middleware');
const newsAndEvents=require('../controllers/newsAndEvents');
const { upload } = require('../cloudinary');

router.route('/')
.get(catchAsync(newsAndEvents.home));

router.route('/add')
.get(isLoggedIn,isArticleEditor,newsAndEvents.renderAddForm)
.post(isLoggedIn,isArticleEditor,upload.array('image'),validateArticle,catchAsync(newsAndEvents.add));

router.route('/:id')
.get(catchAsync(newsAndEvents.newsArticle))
.delete(catchAsync(newsAndEvents.deleteArticle))
.put(isLoggedIn,isArticleEditor,upload.array('image'),validateArticle,catchAsync(newsAndEvents.articleUpdate));

router.route('/:id/edit')
.get(isLoggedIn,isArticleEditor,catchAsync(newsAndEvents.articleEdit));

module.exports = router;