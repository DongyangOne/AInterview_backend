const express = require('express');
const router = express.Router();

const { Twcalendar } = require('../controllers/mainpage/twcalendarController');

router.get('/thisweek', Twcalendar);  

module.exports = router;