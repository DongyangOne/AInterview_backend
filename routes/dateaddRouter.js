const express = require('express');
const router = express.Router();
const { getAdd } = require('../controllers/calendar/addController');

router.get('/add', getAdd);

module.exports = router;