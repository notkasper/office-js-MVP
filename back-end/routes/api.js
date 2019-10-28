const express = require('express');
const { acquireTokenWithAuthorizationCode, getAuthorizationUrl } = require('../handlers/auth');
// Middleware
const authMiddleware = require('../middleware/auth');
// Handlers
const getUserDetails = require('../handlers/getUserDetails');
const putProfile = require('../handlers/putProfile');
const getProfiles = require('../handlers/getProfiles');
const deleteProfile = require('../handlers/deleteProfile');
const updateProfile = require('../handlers/updateProfile');
const getEstablishments = require('../handlers/getEstablishments');
const getDepartments = require('../handlers/getDepartments');
const getWorkFunctions = require('../handlers/getWorkFunctions');
const getLetterTemplate = require('../handlers/getLetterTemplate');
const getAanheffen = require('../handlers/getAanheffen');

const router = express.Router();

/* OPEN */
router.get('/oauth', getAuthorizationUrl);
router.get('/getAccessToken', acquireTokenWithAuthorizationCode);

/* AUTHORIZED */
router.put('/profile', authMiddleware, putProfile);
router.get('/getUserDetails', authMiddleware, getUserDetails);
router.get('/profiles', authMiddleware, getProfiles);
router.delete('/profile/:id', authMiddleware, deleteProfile);
router.patch('/profile/:id', authMiddleware, updateProfile);
router.get('/establishments', authMiddleware, getEstablishments);
router.get('/departments', authMiddleware, getDepartments);
router.get('/letterTemplate', authMiddleware, getLetterTemplate);
router.get('/workFunctions', authMiddleware, getWorkFunctions);
router.get('/aanheffen', authMiddleware, getAanheffen);

module.exports = router;
