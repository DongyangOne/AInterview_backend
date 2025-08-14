const express = require('express');
const router = express.Router();

const { getNotices, readNotice } = require('../../controllers/notice/noticeController');

router.get('/:userId', getNotices);
router.patch('/:userId/:noticeId/read', readNotice);
router.patch('/:userId/read', readNotice);

module.exports = router;