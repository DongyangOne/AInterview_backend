const express = require('express');
const router = express.Router();

const { getNotices, updatePushToken, readNotice, sendNotice } = require('../../controllers/mainpage/mainpageController');
const { getTodayQuestion, getRecentFeedback, Twcalendar } = require('../../controllers/mainpage/mainpageController');

router.get('/question', getTodayQuestion);  
router.get('/calendar', Twcalendar);  
router.get('/feedback', getRecentFeedback); 
router.post('/push-token', updatePushToken);
router.post('/send', sendNotice);
router.patch('/:userId/:noticeId/read', readNotice);
router.patch('/:userId/read', readNotice);
router.get('/:userId', getNotices);

module.exports = router;