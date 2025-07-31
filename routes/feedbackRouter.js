const express = require('express');
const router = express.Router();
const feedbackController= require('../controllers/feedbackController');


router.get('/:userId', feedbackController.getAllFeedback);

router.get('/:userId/:feedbackId', feedbackController.getFeedbackDetail);

router.delete('/:userId/:feedbackId', feedbackController.deleteFeedback);

router.get('/:userId/:feedbackId/title', feedbackController.getFeedbackTitle);
router.patch('/:userId/:feedbackId/title', feedbackController.updateFeedbackTitle);

router.get('/:userId/:feedbackId/memo', feedbackController.getFeedbackMemo);
router.patch('/:userId/:feedbackId/memo', feedbackController.updateFeedbackMemo);

module.exports = router;