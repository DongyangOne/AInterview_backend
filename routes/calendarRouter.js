const express = require('express');
const router = express.Router();
const { getAdd, getDelete, getUpdate } = require('../controllers/calendar/calendarController');

router.get('/add', getAdd);
router.get('/delete', getDelete);
router.get('/update', getUpdate);

module.exports = router; //ROUTER