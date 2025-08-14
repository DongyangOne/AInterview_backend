const express = require('express');
const router = express.Router();

const { getNotices, readNotice, updatePushToken, sendNotice } = require('../../controllers/notice/noticeController');

router.get('/:userId', getNotices);
router.patch('/:userId/:noticeId/read', readNotice);
router.patch('/:userId/read', readNotice);
router.post('/push-token', updatePushToken);
router.post('/send', sendNotice);

module.exports = router;