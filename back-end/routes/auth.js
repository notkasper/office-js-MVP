const express = require('express');
const { getAuthorizationUrl, acquireTokenWithAuthorizationCode } = require('../controllers/auth');

const router = express.Router();

router.get('/url', getAuthorizationUrl);
router.get('/token', acquireTokenWithAuthorizationCode);

module.exports = router;
