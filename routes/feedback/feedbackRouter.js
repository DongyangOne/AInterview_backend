const express = require('express');
const router = express.Router();

const feedbackController = require('../../controllers/feedback/feedbackController');
const { getPin, getUnpin } = require('../../controllers/feedback/feedbackController');

router.get('/:userId/sort', feedbackController.sortFeedbacks);
router.get('/:userId/search', feedbackController.searchFeedbacks);
router.patch('/pin/:feedback_id/:userId', feedbackController.getPin);
router.patch('/unpin/:feedback_id/:userId', feedbackController.getUnpin);
router.get('/:userId/:feedbackId/memo', feedbackController.getFeedbackMemo);
router.patch('/:userId/:feedbackId/memo', feedbackController.updateFeedbackMemo);
router.get('/:userId/:feedbackId/title', feedbackController.getFeedbackTitle);
router.patch('/:userId/:feedbackId/title', feedbackController.updateFeedbackTitle);
router.delete('/:feedbackId/:userId', feedbackController.deleteFeedback);
router.get('/:userId/:feedbackId', feedbackController.getFeedbackDetail);
router.get('/:userId', feedbackController.getAllFeedback);

module.exports = router;