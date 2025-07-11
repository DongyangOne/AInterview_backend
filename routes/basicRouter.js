const express = require('express');
const router = express.Router();
const basicController = require('../controllers/basicController');

router.get('/', basicController.checkDbConnection);

module.exports = router;