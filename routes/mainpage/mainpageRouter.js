const express = require('express');
const router = express.Router();

const { getNotices } = require('../../controllers/mainpage/noticeController');
const { getTodayQuestion } = require('../../controllers/mainpage/mainpageController');
const { Twcalendar } = require('../../controllers/mainpage/mainpageController');
const { getRecentFeedback } = require('../../controllers/mainpage/mainpageController');

router.get('/', getNotices);
router.get('/today', getTodayQuestion);  
router.get('/thisweek', Twcalendar);  
router.get('/recent', getRecentFeedback); 

module.exports = router;