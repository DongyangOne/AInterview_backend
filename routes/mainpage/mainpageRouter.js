const express = require('express');
const router = express.Router();

const { getTodayQuestion, getRecentFeedback, Twcalendar } = require('../../controllers/mainpage/mainpageController');

router.get('/question', getTodayQuestion);  
router.get('/calendar', Twcalendar);  
router.get('/feedback', getRecentFeedback);

module.exports = router;