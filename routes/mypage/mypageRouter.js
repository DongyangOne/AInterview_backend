const express = require('express');
const router = express.Router();

const {pwChange, nicknameChange, setAppPush, passwordCheck} = require('../../controllers/mypage/mypageController');
const {myInfoProgress} = require('../../controllers/mypage/mypageController');
const {feedInfoProgress, deleteUserProgress} = require('../../controllers/mypage/mypageController');

router.post('/changePw', pwChange);
router.post('/changeName', nicknameChange);
router.get('/setAppPush', setAppPush);
router.post('/checkPw', passwordCheck);
router.get('/myInfo', myInfoProgress);
router.get('/feedInfo', feedInfoProgress);
router.get('/deleteUser', deleteUserProgress);

module.exports = router;