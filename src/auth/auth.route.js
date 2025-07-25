const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const validateRequest = require('../middleware/validateRequest');
const { signupSchema, loginSchema } = require('./auth.validation');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', validateRequest(signupSchema), authController.signup);
router.post('/login', validateRequest(loginSchema), authController.login);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router; 