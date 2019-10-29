const express = require('express');
const adminAuth = require('../middleware/admin');
const { emptyTable } = require('../controllers/admin');

const router = express.Router();

router.delete('/tables/:name', adminAuth, emptyTable);

module.exports = router;
