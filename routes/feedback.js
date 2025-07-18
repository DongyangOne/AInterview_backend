const express = require('express');
const router = express.Router();
const FeedbackModel = require('../models/feedbacks');

// 피드백 검색 
router.get('/feedbacks/search', (req, res) => {
  const { keyword } = req.query;
  FeedbackModel.searchFeedbacks(keyword, (err, rows) => {
    if (err) {
      console.error('피드백 검색 오류:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
