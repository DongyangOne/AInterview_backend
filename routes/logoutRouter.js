const express = require('express');
const router = express.Router();
const {logoutProgress} = require('../controllers/register/logoutController');

router.get('/', logoutProgress);

module.exports = router;