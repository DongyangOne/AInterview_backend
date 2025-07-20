const express = require('express');
const router = express.Router();
const {pwChange} = require('../controllers/mypage/userController');


router.post('/changePw', pwChange);

module.exports = router;