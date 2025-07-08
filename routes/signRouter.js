const express = require('express');
const router = express.Router();
const {signinProgress, signupProgress, userIdCheckProgress} = require('../controllers/register/signController');

router.get('/login', signinProgress);
router.get('/signup', signupProgress);
router.get('/userIdCheck', userIdCheckProgress);

module.exports = router;