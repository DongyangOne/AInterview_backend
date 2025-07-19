const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback/feedbackController');

router.get('/:userId/:feedbackId/title', feedbackController.getFeedbackTitle);

router.patch('/:userId/:feedbackId/title', feedbackController.updateFeedbackTitle);


module.exports = router;