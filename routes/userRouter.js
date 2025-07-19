const express = require('express');
const router = express.Router();
const {pwChange, nicknameChange, setAppPush} = require('../controllers/mypage/userController');

router.post('/changePw', pwChange);
router.post('/changeName', nicknameChange);
router.get('/setAppPush', setAppPush);

module.exports = router;