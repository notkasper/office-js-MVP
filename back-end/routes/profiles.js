const express = require('express');
const { createProfile, deleteProfile, getProfiles, updateProfile } = require('../controllers/profiles');

const router = express.Router();

router.get('/', getProfiles);
router.post('/', createProfile);
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);

module.exports = router;
