const express = require('express');
const router = express.Router();

const { updatePushToken, sendNotice } = require('../../controllers/mainpage/mainpageController');
const { getTodayQuestion } = require('../../controllers/mainpage/mainpageController');
const { Twcalendar } = require('../../controllers/mainpage/mainpageController');
const { getRecentFeedback } = require('../../controllers/mainpage/mainpageController');

router.get('/today', getTodayQuestion);  
router.get('/thisweek', Twcalendar);  
router.get('/recent', getRecentFeedback); 
router.post('/push-token', updatePushToken);
router.post('/send', sendNotice);

module.exports = router;