const express = require('express');
const router = express.Router();

const { Twcalendar } = require('../controllers/mainpage/calendarController');

router.get('/thisweek', Twcalendar);  

module.exports = router;