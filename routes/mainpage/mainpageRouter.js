const express = require('express');
const router = express.Router();

const { getNotices } = require('../../controllers/mainpage/noticeController');
const { getTodayQuestion } = require('../../controllers/mainpage/questionController');
const { Twcalendar } = require('../../controllers/mainpage/twcalendarController');
const { getRecentFeedback } = require('../../controllers/feedback/recentfeedbackController');

router.get('/', getNotices);
router.get('/today', getTodayQuestion);  
router.get('/thisweek', Twcalendar);  
router.get('/recent', getRecentFeedback); 

module.exports = router;