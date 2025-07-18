const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback/feedbackController');

router.get('/:userId', feedbackController.getAllFeedback);

module.exports = router;