const express = require('express');
// Middleware
const authMiddleware = require('../middleware/auth');
// Handlers
const getUserDetails = require('../handlers/getUserDetails');
const getLetterTemplate = require('../handlers/getLetterTemplate');
const adminRouter = require('./admin');
const formDataRouter = require('./formData');
const profilesRouter = require('./profiles');
const authRouter = require('./auth');

const router = express.Router();

router.use('/admin', adminRouter);
router.use('/formData', authMiddleware, formDataRouter);
router.use('/profiles', authMiddleware, profilesRouter);
router.use('/auth', authRouter);

/* AUTHORIZED */
router.get('/getUserDetails', authMiddleware, getUserDetails);
router.get('/letterTemplate', authMiddleware, getLetterTemplate);

module.exports = router;
