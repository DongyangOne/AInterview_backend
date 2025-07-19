const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbacks/feedbackController');

router.get('/:userId', feedbackController.getAllFeedback);

module.exports = router;