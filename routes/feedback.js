const express = require('express');
const router = express.Router();
const { searchFeedbacks } = require('../controllers/feedbacks/search');

// 피드백 검색
router.get('/feedbacks', searchFeedbacks);

module.exports = router;