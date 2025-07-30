const express = require('express');
const router = express.Router();
const { addDate } = require('../controllers/calendar/addController');

router.get('/add', addDate);

module.exports = router;