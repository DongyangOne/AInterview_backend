const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback/feedbacksearchController'); 

router.get('/search', feedbackController.searchFeedbacks);

module.exports = router;