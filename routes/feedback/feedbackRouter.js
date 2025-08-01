const express = require('express');
const router = express.Router();

const feedbackController = require('../../controllers/feedback/feedbackController');
const { getPin, getUnpin } = require('../../controllers/feedback/feedbackController');

router.get('/sort', feedbackController.sortFeedbacks);
router.get('/search', feedbackController.searchFeedbacks);
router.get('/:userId', feedbackController.getAllFeedback);
router.get('/:userId/:feedbackId/title', feedbackController.getFeedbackTitle);
router.patch('/:userId/:feedbackId/title', feedbackController.updateFeedbackTitle);
router.delete('/:feedbackId/:userId', feedbackController.deleteFeedback);
router.get('/:userId/:feedbackId', feedbackController.getFeedbackDetail);
router.get('/:userId/:feedbackId/memo', feedbackController.getFeedbackMemo);
router.patch('/:userId/:feedbackId/memo', feedbackController.updateFeedbackMemo);
router.patch('/pin/:feedback_id', getPin);
router.patch('/unpin/:feedback_id', getUnpin);

module.exports = router;