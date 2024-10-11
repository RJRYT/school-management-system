const express = require("express");
const router = express.Router();
const { AuthMiddleware } = require("../middleware");
const { FeesController } = require("../controllers");

// @route GET /api/fees
router.get(
  "/",
  AuthMiddleware(["Admin", "OfficeStaff"]),
  FeesController.getFeesHistory
);

module.exports = router;
