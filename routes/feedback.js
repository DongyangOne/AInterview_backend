const express = require('express');
const router = express.Router();
const { sortFeedbacks } = require('../controllers/feedbacks/sort');

//  피드백 정렬
router.get('/sort', sortFeedbacks);

module.exports = router;