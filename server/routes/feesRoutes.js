const express = require("express");
const router = express.Router();
const { AuthMiddleware } = require("../middleware");
const { FeesController } = require("../controllers");

// @route GET /api/fees
router.get(
  "/",
  AuthMiddleware(["Admin", "OfficeStaff", "Librarian"]),
  FeesController.getFeesHistory
);

// @route GET /api/fees/:id
router.get(
  "/:id",
  AuthMiddleware(["Admin", "OfficeStaff", "Librarian"]),
  FeesController.getFeesHistoryById
);

// @route POST /api/fees
router.post(
  "/",
  AuthMiddleware(["Admin", "OfficeStaff"]),
  FeesController.addNewFeesHistory
);

// @route PUT /api/fees/:id
router.put(
  "/:id",
  AuthMiddleware(["Admin", "OfficeStaff"]),
  FeesController.updateFeesHistory
);

// @route DELETE /api/fees/:id
router.delete(
  "/:id",
  AuthMiddleware(["Admin"]),
  FeesController.deleteFeesHistory
);

module.exports = router;
