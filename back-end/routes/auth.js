const express = require('express');
const { getAuthorizationUrl, acquireTokenWithAuthorizationCode, getUserDetails } = require('../controllers/auth');

const router = express.Router();

router.get('/url', getAuthorizationUrl);
router.get('/token', acquireTokenWithAuthorizationCode);
router.get('/me', getUserDetails);

module.exports = router;
