const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback/deletefeedbackController');

router.get('/', feedbackController.getFeedbackList);

router.patch('/:feedbackId', feedbackController.updateFeedback);

router.delete('/:feedbackId', feedbackController.deleteFeedback);

module.exports = router;