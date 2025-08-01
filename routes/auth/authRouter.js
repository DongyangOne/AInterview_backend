const express = require('express');
const router = express.Router();

const {logoutProgress} = require('../../controllers/auth/authController');
const {signinProgress, signupProgress, userIdCheckProgress} = require('../../controllers/auth/authController');

router.post('/login', signinProgress);
router.post('/signup', signupProgress);
router.post('/userIdCheck', userIdCheckProgress);
router.get('/', logoutProgress);

module.exports = router;