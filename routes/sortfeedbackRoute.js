const express = require('express');
const router = express.Router();
const feedbackSortController = require('../controllers/feedbacks/feedbacksortController');

router.get('/sort', feedbackSortController.sortFeedbacks);

module.exports = router;