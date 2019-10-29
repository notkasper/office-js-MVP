const express = require('express');
const adminAuth = require('../middleware/admin');
const { clearTable, seedTable, seedTables, clearTables } = require('../controllers/admin');

const router = express.Router();

router.delete('/tables/:name', adminAuth, clearTable);
router.post('/tables/:name', adminAuth, seedTable);
router.post('/tables', adminAuth, seedTables);
router.delete('/tables', adminAuth, clearTables);

module.exports = router;
