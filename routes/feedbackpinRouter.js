const express = require('express');
const router = express.Router();
const { getPin, getUnpin } = require('../controllers/feedback/feedbackpinController');

router.patch('/pin/:feedback_id', getPin);
router.patch('/unpin/:feedback_id', getUnpin);


module.exports = router;