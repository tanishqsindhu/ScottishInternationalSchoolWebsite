const express = require('express');
const router = express.Router();
const publication = require('../controllers/publications')

router.route('/')
.get(publication.home)
.post(upload.single('image'),publication.add);

router.route('/add')
.get(publication.renderAddForm);


module.exports = router;