const express = require('express');
const router = express.Router();
const {pwChange, nicknameChange, setAppPush, passwordCheck} = require('../controllers/mypage/userController');

router.get('/changePw', pwChange);
router.get('/changeName', nicknameChange);
router.get('/setAppPush', setAppPush);
router.get('/checkPw', passwordCheck);


module.exports = router;