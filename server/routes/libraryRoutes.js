const express = require("express");
const router = express.Router();
const { AuthMiddleware } = require("../middleware");
const { LibraryController } = require("../controllers");

// @route GET /api/library
router.get(
  "/",
  AuthMiddleware(["Admin", "Librarian"]),
  LibraryController.getLibraryHistory
);

module.exports = router;
