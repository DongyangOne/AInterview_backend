const express = require('express');
const router = express.Router();
const { getSearchDay } = require('../controllers/calendar/dayController');

router.get('/day', getSearchDay);

module.exports = router; //ROUTER