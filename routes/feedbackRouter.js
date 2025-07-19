const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbacks/feedbackController');

router.patch('/feedback/:userId/:feedbackId/title', feedbackController.updateTitle);


module.exports = router;
