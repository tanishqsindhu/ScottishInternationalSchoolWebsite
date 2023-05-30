const express = require('express');
const router = express.Router();
const accomplishments = require('../controllers/accomplishments')

router.route('/academics')
    .get(accomplishments.academics);
router.route('/sports')
    .get(accomplishments.sports);
router.route('/coCurricular')
    .get(accomplishments.coCurricular);

module.exports = router;