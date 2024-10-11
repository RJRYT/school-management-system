const express = require("express");
const router = express.Router();
const { AuthMiddleware } = require("../middleware");
const { UserController } = require("../controllers");

router.get("/me", AuthMiddleware(), UserController.getUserData);

module.exports = router;
