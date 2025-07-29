const express = require('express');
const router = express.Router();
const { getCreate } = require('../controllers/calendar/addController');

router.get('/add', getCreate);

module.exports = router;