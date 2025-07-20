const express = require('express');
const router = express.Router();
const detailfeedbackController = require('../controllers/feedback/detailfeedbackController');

router.get('/:userId/:feedbackId', detailfeedbackController.getFeedbackDetail);



module.exports = router;