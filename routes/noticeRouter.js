const express = require('express');
const router = express.Router();
const { getNotices } = require('../controllers/mainpage/noticeController');

router.get('/', getNotices);

module.exports = router;