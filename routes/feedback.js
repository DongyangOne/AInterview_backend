const express = require('express');
const router = express.Router();
const FeedbackModel = require('../models/feedbacks');

// 피드백 정렬 
router.get('/sort', (req, res) => {
  const { by } = req.query;
  FeedbackModel.sortFeedbacks(by, (err, rows) => {
    if (err) {
      console.error('피드백 정렬 오류:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;