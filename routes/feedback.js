const express = require('express');
const router = express.Router();
const { pinFeedback, unpinFeedback } = require('../controllers/feedbacks/pin');

router.patch('/pin/:id', pinFeedback);
router.patch('/unpin/:id', unpinFeedback);

router.patch('/:id', pinFeedback);

module.exports = router;