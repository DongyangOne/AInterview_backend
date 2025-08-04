const express = require('express');
const router = express.Router();

const { getNotices, updatePushToken, readNotice, sendNotice } = require('../../controllers/mainpage/mainpageController');
const { getTodayQuestion } = require('../../controllers/mainpage/mainpageController');
const { Twcalendar } = require('../../controllers/mainpage/mainpageController');
const { getRecentFeedback } = require('../../controllers/mainpage/mainpageController');

router.post('/push-token', updatePushToken);
router.get('/:userId', getNotices);
router.patch('/:userId/:noticeId/read', readNotice);
router.patch('/:userId/read', readNotice);
router.post('/send', sendNotice);
router.get('/today', getTodayQuestion);  
router.get('/thisweek', Twcalendar);  
router.get('/recent', getRecentFeedback); 

module.exports = router;