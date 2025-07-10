const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback/feedbackController');

router.get('/', feedbackController.getFeedbackList);

router.patch('/:feedbackId', feedbackController.updateFeedbackTitle);

module.exports = router;