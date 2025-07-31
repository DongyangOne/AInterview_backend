const express = require('express');
const router = express.Router();

const { addDate } = require('../../controllers/calendar/addController');
const { getDelete } = require('../../controllers/calendar/deleteController');
const { getUpdate } = require('../../controllers/calendar/updateController');
const { getSearchDay } = require('../../controllers/calendar/dayController');
const { getSearchmonth } = require('../../controllers/calendar/monthController');

router.get('/add', addDate);
router.get('/delete', getDelete);
router.get('/update', getUpdate);
router.get('/day', getSearchDay);
router.get('/month', getSearchmonth);

module.exports = router;