const express = require('express');
const router = express.Router();

const { addDate } = require('../../controllers/calendar/calendarController');
const { getDelete } = require('../../controllers/calendar/calendarController');
const { getUpdate } = require('../../controllers/calendar/calendarController');
const { getSearchDay } = require('../../controllers/calendar/calendarController');
const { getSearchmonth } = require('../../controllers/calendar/calendarController');

router.get('/add', addDate);
router.get('/delete', getDelete);
router.get('/update', getUpdate);
router.get('/day', getSearchDay);
router.get('/month', getSearchmonth);

module.exports = router;