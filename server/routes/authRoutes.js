const express = require('express');
const router = express.Router();
const { AuthController } = require('../controllers');

// Register
router.post("/register", AuthController.register);

// Login
router.post("/login", AuthController.login);

module.exports = router;
