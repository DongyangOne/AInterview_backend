const express = require('express');
const router = express.Router();
const { getMonth } = require('../controllers/calendar/monthController');

router.get('/month', getMonth);

module.exports = router;