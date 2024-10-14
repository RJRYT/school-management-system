const express = require("express");
const router = express.Router();
const { AuthMiddleware } = require("../middleware");
const { LibraryController } = require("../controllers");

// @route GET /api/library
router.get(
  "/",
  AuthMiddleware(["Admin", "Librarian", "OfficeStaff"]),
  LibraryController.getLibraryHistory
);

// @route GET /api/library/:id
router.get(
  "/:id",
  AuthMiddleware(["Admin", "Librarian", "OfficeStaff"]),
  LibraryController.getSingleLibraryHistory
);

// @route POST /api/library
router.post(
  "/",
  AuthMiddleware(["Admin", "Librarian"]),
  LibraryController.addLibraryHistory
);

// @route PUT /api/library/:id
router.put(
  "/:id",
  AuthMiddleware(["Admin", "Librarian"]),
  LibraryController.updateLibraryHistory
);

// @route DELETE /api/library/:id
router.delete(
  "/:id",
  AuthMiddleware(["Admin"]),
  LibraryController.deleteLibraryHistory
);

module.exports = router;
