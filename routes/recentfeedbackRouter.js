const express = require('express');
const router = express.Router();

const { getRecentFeedback } = require('../controllers/feedback/feedbackController');

router.get('/recent', getRecentFeedback);  
module.exports = router;