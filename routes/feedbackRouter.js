const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbacks/feedbackController');

router.delete('/:userId/:feedbackId', feedbackController.deleteFeedback);



module.exports = router;
