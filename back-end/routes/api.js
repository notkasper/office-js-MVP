const express = require('express');
const { acquireTokenWithAuthorizationCode, getAuthorizationUrl } = require('../handlers/auth');
// Middleware
const authMiddleware = require('../middleware/auth');
// Handlers
const getUserDetails = require('../handlers/getUserDetails');
const createProfile = require('../handlers/createProfile');
const getProfiles = require('../handlers/getProfiles');
const deleteProfile = require('../handlers/deleteProfile');
const updateProfile = require('../handlers/updateProfile');
const getEstablishments = require('../handlers/getEstablishments');
const getDepartments = require('../handlers/getDepartments');
const getWorkFunctions = require('../handlers/getWorkFunctions');
const getLetterTemplate = require('../handlers/getLetterTemplate');
const getAanhefs = require('../handlers/getAanhefs');
const getGroetOpties = require('../handlers/getGroetOpties');
const adminRouter = require('./admin');

const router = express.Router();

router.use('/admin', adminRouter);

/* OPEN */
router.get('/oauth', getAuthorizationUrl);
router.get('/getAccessToken', acquireTokenWithAuthorizationCode);

/* AUTHORIZED */
router.post('/profile', authMiddleware, createProfile);
router.get('/getUserDetails', authMiddleware, getUserDetails);
router.get('/profiles', authMiddleware, getProfiles);
router.delete('/profile/:id', authMiddleware, deleteProfile);
router.put('/profile/:id', authMiddleware, updateProfile);
router.get('/establishments', authMiddleware, getEstablishments);
router.get('/departments', authMiddleware, getDepartments);
router.get('/letterTemplate', authMiddleware, getLetterTemplate);
router.get('/workFunctions', authMiddleware, getWorkFunctions);
router.get('/aanhefs', authMiddleware, getAanhefs);
router.get('/groetOpties', authMiddleware, getGroetOpties);

module.exports = router;
