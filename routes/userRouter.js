const express = require('express');
const router = express.Router();
const {pwChange, nicknameChange} = require('../controllers/mypage/userController');

router.get('/changePw', pwChange);
router.post('/changeName', nicknameChange);

module.exports = router;