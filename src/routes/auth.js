const express = require('express');
const router = express.Router();
const { register, login, me } = require('../../auth-backend/controllers/authController');
const authGuard = require('../../auth-backend/middleware/authGuard');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authGuard, me);

module.exports = router;
