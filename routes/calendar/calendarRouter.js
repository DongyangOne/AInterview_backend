const express = require('express');
const router = express.Router();

const { addDate, getDelete, getUpdate, getSearchDay, getSearchmonth } = require('../../controllers/calendar/calendarController');

router.get('/add', addDate);
router.get('/delete', getDelete);
router.get('/update', getUpdate);
router.get('/day', getSearchDay);
router.get('/month', getSearchmonth);

module.exports = router;