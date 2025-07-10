const express = require('express');
const router = express.Router();
const { getDay } = require('../controllers/calendar/dayController');

router.get('/day', getDay);

module.exports = router; //ROUTER