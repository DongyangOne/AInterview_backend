const express = require('express');
const router = express.Router();
const { getNotices } = require('../controllers/mainpage/noticeController')
const { savePushToken, sendNotification } = require('../controllers/mainpage/notificationController');

router.get('/', getNotices);
router.post('/push-token', savePushToken);
router.post('/notify', sendNotification);

module.exports = router;