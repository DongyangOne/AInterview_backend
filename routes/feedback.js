const express = require('express');
const router = express.Router();
const { sortFeedbacks } = require('../controllers/feedbacks/sort');

router.get('/sort', sortFeedbacks);

module.exports = router;