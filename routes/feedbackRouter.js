const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbacks/feedbackController');

router.get('/:userId/:feedbackId/memo', feedbackController.getFeedbackMemo);

router.patch('/:userId/:feedbackId/memo', feedbackController.updateFeedbackMemo);
module.exports= router;
