const express = require('express');
const router = express.Router();
const mainfeedbackController = require('../controllers/feedback/mainfeedbackController');

router.get('/:userId', mainfeedbackController.getAllFeedback);



module.exports = router;