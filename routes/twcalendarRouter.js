const express = require('express');
const router = express.Router();

const { Twcalendar } = require('../controllers/calendar/calendarController');

router.get('/thisweek', Twcalendar);  

module.exports = router;