const express = require('express');
const router = express.Router();
const {feedInfoProgress, deleteUserProgress} = require('../controllers/mypage/deleteController');

router.get('/feedInfo', feedInfoProgress);
router.get('/deleteUser', deleteUserProgress);

module.exports = router;