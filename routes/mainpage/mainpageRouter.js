const express = require('express');
const router = express.Router();

const { updatePushToken, sendNotice } = require('../../controllers/mainpage/mainpageController');
const { getTodayQuestion, getRecentFeedback, Twcalendar } = require('../../controllers/mainpage/mainpageController');

router.get('/question', getTodayQuestion);  
router.get('/calendar', Twcalendar);  
router.get('/feedback', getRecentFeedback); 
router.post('/push-token', updatePushToken);
router.post('/send', sendNotice);

module.exports = router;