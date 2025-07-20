const express = require('express');
const router = express.Router();

const { getTodayQuestion } = require('../controllers/mainpage/questionController');

router.get('/today', getTodayQuestion);  
module.exports = router;