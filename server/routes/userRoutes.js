const express = require("express");
const router = express.Router();
const { AuthMiddleware } = require("../middleware");
const { UserController } = require("../controllers");

// @route GET /api/user/me
router.get(
  "/me",
  AuthMiddleware(),
  UserController.getUserData
);

module.exports = router;
