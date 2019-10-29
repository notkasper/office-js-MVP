const express = require('express');
const { getLetterTemplate } = require('../controllers/other');

const router = express.Router();

router.get('/letterTemplate', getLetterTemplate);

module.exports = router;
