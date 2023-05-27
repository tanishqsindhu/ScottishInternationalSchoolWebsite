const express = require('express');
const router = express.Router();
// const catchAsync = require('../utils/catchAsync');
const beyondClassroom=require('../controllers/beyondClassroom');

router.route('/')
    .get(beyondClassroom.home);

router.route('/sports')
    .get(beyondClassroom.sports);

router.route('/co-curricular')
    .get(beyondClassroom.coCurricular);

module.exports = router;