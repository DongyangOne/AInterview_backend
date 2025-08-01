const express = require('express');
const router = express.Router();

const {pwChange, nicknameChange, setAppPush, passwordCheck} = require('../../controllers/mypage/userController');
const {myInfoProgress} = require('../../controllers/mypage/myPageController');
const {feedInfoProgress, deleteUserProgress} = require('../../controllers/mypage/deleteController');

router.post('/changePw', pwChange);
router.post('/changeName', nicknameChange);
router.get('/setAppPush', setAppPush);
router.post('/checkPw', passwordCheck);
router.get('/myInfo', myInfoProgress);
router.get('/feedInfo', feedInfoProgress);
router.get('/deleteUser', deleteUserProgress);

module.exports = router;