const express = require('express');
const router = express.Router();
const exampleRouter = require('../controllers/basicController');

router.get('/', exampleRouter.getExample);

module.exports = router;
