const express = require('express');
const router = express.Router();
const {pwChange} = require('../controllers/mypage/userController');


router.post('/changePw', pwChange);
router.get('/changeName', nicknameChange);
router.get('/setAppPush', setAppPush);
router.get('/checkPw', passwordCheck);

module.exports = router;