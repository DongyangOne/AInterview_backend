const express = require('express');
const router = express.Router();

//mypage
const {pwChange, nicknameChange, setAppPush, passwordCheck} = require('../controllers/mypage/userController');
const {myInfoProgress} = require('../controllers/mypage/myPageController');
const {feedInfoProgress, deleteUserProgress} = require('../controllers/mypage/deleteController');

router.post('/changePw', pwChange);
router.post('/changeName', nicknameChange);
router.get('/setAppPush', setAppPush);
router.post('/checkPw', passwordCheck);
router.get('/myInfo', myInfoProgress);
router.get('/feedInfo', feedInfoProgress);
router.get('/deleteUser', deleteUserProgress);

//mainpage
const { getNotices } = require('../controllers/mainpage/noticeController');
const { getTodayQuestion } = require('../controllers/mainpage/questionController');
const { Twcalendar } = require('../controllers/mainpage/twcalendarController');
const { getRecentFeedback } = require('../controllers/feedback/recentfeedbackController');

router.get('/', getNotices);
router.get('/today', getTodayQuestion);  
router.get('/thisweek', Twcalendar);  
router.get('/recent', getRecentFeedback);  


//feedback
const feedbackSortController = require('../controllers/feedback/feedbacksortController');
const titlefeedbackController = require('../controllers/feedback/titlefeedbackController');
const searchfeedbackController = require('../controllers/feedback/feedbacksearchController'); 
const mainfeedbackController = require('../controllers/feedback/mainfeedbackController');
const deletefeedbackController = require('../controllers/feedback/deletefeedbackController');
const detailfeedbackController = require('../controllers/feedback/detailfeedbackController');
const memofeedbackController = require('../controllers/feedback/feedbackmemoController');
const { getPin, getUnpin } = require('../controllers/feedback/feedbackpinController');

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


//calendar
const { addDate } = require('../controllers/calendar/addController');
const { getDelete } = require('../controllers/calendar/deleteController');
const { getUpdate } = require('../controllers/calendar/updateController');
const { getSearchDay } = require('../controllers/calendar/dayController');
const { getSearchmonth } = require('../controllers/calendar/monthController');

router.get('/add', addDate);
router.get('/delete', getDelete);
router.get('/update', getUpdate);
router.get('/day', getSearchDay);
router.get('/month', getSearchmonth);


//register
const {logoutProgress} = require('../controllers/register/logoutController');
const {signinProgress, signupProgress, userIdCheckProgress} = require('../controllers/register/signController');

router.post('/login', signinProgress);
router.post('/signup', signupProgress);
router.post('/userIdCheck', userIdCheckProgress);
router.get('/', logoutProgress);

module.exports = router;