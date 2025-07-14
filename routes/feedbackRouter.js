const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback/feedbackController');

router.get('/', feedbackController.getFeedbackList);
router.get('/:feedbackId', feedbackController.getFeedbackDetail);
router.patch('/:feedbackId', feedbackController.updateFeedback);
router.delete('/:feedbackId', feedbackController.deleteFeedback);

module.exports = router;