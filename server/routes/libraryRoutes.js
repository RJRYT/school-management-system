const express = require("express");
const router = express.Router();
const { getLibraryHistory } = require("../controllers/libraryController");

// @route GET /api/library
router.get("/", getLibraryHistory);

module.exports = router;
