const express = require('express');
const router = express.Router();
const { getUpdate } = require('../controllers/calendar/updateController');

router.get('/update', getUpdate);

module.exports = router;