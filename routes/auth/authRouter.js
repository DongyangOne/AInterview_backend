const express = require('express');
const router = express.Router();

const {logoutProgress} = require('../../controllers/register/logoutController');
const {signinProgress, signupProgress, userIdCheckProgress} = require('../../controllers/register/signController');

router.post('/login', signinProgress);
router.post('/signup', signupProgress);
router.post('/userIdCheck', userIdCheckProgress);
router.get('/', logoutProgress);

module.exports = router;