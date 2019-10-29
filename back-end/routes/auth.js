const express = require('express');
const { getAuthorizationUrl, acquireTokenWithAuthorizationCode, getUserDetails } = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/url', getAuthorizationUrl);
router.get('/token', acquireTokenWithAuthorizationCode);
router.get('/me', authMiddleware, getUserDetails);

module.exports = router;
