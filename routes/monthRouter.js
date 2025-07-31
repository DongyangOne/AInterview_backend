const express = require('express');
const router = express.Router();
const {getSearchmonth } = require('../controllers/calendar/monthController');

router.get('/month', getSearchmonth);

module.exports = router;