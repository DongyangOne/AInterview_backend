const express = require('express');
const router = express.Router();
const { getaddDate } = require('../controllers/calendar/addController');

router.get('/add', getaddDate);

module.exports = router;