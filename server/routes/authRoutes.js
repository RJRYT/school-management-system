const express = require('express');
const router = express.Router();
const { AuthController } = require('../controllers');

// @route POST /api/auth/register
router.post("/register", AuthController.register);

// @route POST /api/auth/login
router.post("/login", AuthController.login);

module.exports = router;
