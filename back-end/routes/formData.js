const express = require('express');
const { getAanhefs, getDepartments, getEstablishments, getGroetOpties, getWorkFunctions } = require('../controllers/formData');

const router = express.Router();

router.get('/establishments', getEstablishments);
router.get('/departments', getDepartments);
router.get('/workFunctions', getWorkFunctions);
router.get('/aanhefs', getAanhefs);
router.get('/groetOpties', getGroetOpties);

module.exports = router;
