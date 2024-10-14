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

router.get(
  "/:id",
  AuthMiddleware(["Admin", "Librarian", "OfficeStaff"]),
  LibraryController.getSingleLibraryHistory
);

router.post(
  "/",
  AuthMiddleware(["Admin", "Librarian"]),
  LibraryController.addLibraryHistory
);

router.put(
  "/:id",
  AuthMiddleware(["Admin", "Librarian"]),
  LibraryController.updateLibraryHistory
);

router.delete(
  "/:id",
  AuthMiddleware(["Admin"]),
  LibraryController.deleteLibraryHistory
);

module.exports = router;
