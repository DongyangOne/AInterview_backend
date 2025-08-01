const express = require('express');
const router = express.Router();

const feedbackSortController = require('../../controllers/feedback/feedbackController');
const titlefeedbackController = require('../../controllers/feedback/feedbackController');
const searchfeedbackController = require('../../controllers/feedback/feedbackController'); 
const mainfeedbackController = require('../../controllers/feedback/feedbackController');
const deletefeedbackController = require('../../controllers/feedback/feedbackController');
const detailfeedbackController = require('../../controllers/feedback/feedbackController');
const memofeedbackController = require('../../controllers/feedback/feedbackController');
const { getPin, getUnpin } = require('../../controllers/feedback/feedbackController');

router.get('/sort', feedbackSortController.sortFeedbacks);
router.get('/search', searchfeedbackController.searchFeedbacks);
router.get('/:userId', mainfeedbackController.getAllFeedback);
router.get('/:userId/:feedbackId/title', titlefeedbackController.getFeedbackTitle);
router.patch('/:userId/:feedbackId/title', titlefeedbackController.updateFeedbackTitle);
router.delete('/:feedbackId/:userId', deletefeedbackController.deleteFeedback);
router.get('/:userId/:feedbackId', detailfeedbackController.getFeedbackDetail);
router.get('/:userId/:feedbackId/memo', memofeedbackController.getFeedbackMemo);
router.patch('/:userId/:feedbackId/memo', memofeedbackController.updateFeedbackMemo);
router.patch('/pin/:feedback_id', getPin);
router.patch('/unpin/:feedback_id', getUnpin);

module.exports = router;