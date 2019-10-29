const express = require('express');
const { acquireTokenWithAuthorizationCode, getAuthorizationUrl } = require('../handlers/auth');
// Middleware
const authMiddleware = require('../middleware/auth');
// Handlers
const getUserDetails = require('../handlers/getUserDetails');
const getLetterTemplate = require('../handlers/getLetterTemplate');
const adminRouter = require('./admin');
const formDataRouter = require('./formData');
const profilesRouter = require('./profiles');

const router = express.Router();

router.use('/admin', adminRouter);
router.use('/formData', authMiddleware, formDataRouter);
router.use('/profiles', authMiddleware, profilesRouter);

/* OPEN */
router.get('/oauth', getAuthorizationUrl);
router.get('/getAccessToken', acquireTokenWithAuthorizationCode);

/* AUTHORIZED */
router.get('/getUserDetails', authMiddleware, getUserDetails);
router.get('/letterTemplate', authMiddleware, getLetterTemplate);

module.exports = router;
