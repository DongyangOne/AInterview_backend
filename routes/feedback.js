const express = require('express');
const router = express.Router();
const { pinFeedback, unpinFeedback } = require('../controllers/feedbacks/pin');


router.get('/:userId', feedbackController.getAllFeedback);

// 피드백 상단 고정
router.patch('/pin/:id', pinFeedback);

// 피드백 상단 고정 해제
router.patch('/unpin/:id', unpinFeedback);

module.exports = router;