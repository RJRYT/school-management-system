const express = require("express");
const router = express.Router();
const { getFeesHistory } = require("../controllers/feesController");

// @route GET /api/fees
router.get("/", getFeesHistory);

module.exports = router;
