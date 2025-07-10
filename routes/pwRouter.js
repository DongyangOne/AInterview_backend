const express = require('express');
const router = express.Router();
const {pwChange} = require('../controllers/mypage/pwController');

router.get('/', pwChange);

module.exports = router;