const express = require('express');
const router = express.Router();
const {signinProgress, signupProgress, userIdCheckProgress} = require('../controllers/register/signController');

router.post('/login', signinProgress);
router.post('/signup', signupProgress);
router.post('/userIdCheck', userIdCheckProgress);

module.exports = router;