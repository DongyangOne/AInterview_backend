const express = require('express');
const router = express.Router();
const {myInfoProgress} = require('../controllers/mypage/myPageController');

router.get('/myInfo', myInfoProgress);

module.exports = router;