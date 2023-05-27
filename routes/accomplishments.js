const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const accomplishments = require('../controllers/accomplishments')
router.route('/academics')
    .get(accomplishments.academics);

module.exports = router;