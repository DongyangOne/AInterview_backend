const express = require('express');
const router = express.Router();
const { getDelete } = require('../controllers/calendar/deleteController');

router.get('/delete', getDelete);

module.exports = router;