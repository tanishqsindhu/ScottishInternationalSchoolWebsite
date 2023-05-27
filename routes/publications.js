const express = require('express');
const router = express.Router();
const publication = require('../controllers/publications')
const multer=require('multer');
const {storage} = require('../cloudinary')
const upload=multer({storage});

router.route('/')
.get(publication.home)
.post(upload.single('image'),publication.add);

router.route('/add')
.get(publication.renderAddForm);


module.exports = router;