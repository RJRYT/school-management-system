const express = require("express");
const { AuthMiddleware } = require("../middleware");
const { StudentController } = require("../controllers");
const router = express.Router();

// @route GET /api/student
router.get(
  "/",
  AuthMiddleware(["Admin", "OfficeStaff", "Librarian"]),
  StudentController.getStudents
);

// @route GET /api/student/:id
router.get(
  "/:id",
  AuthMiddleware(["Admin", "OfficeStaff", "Librarian"]),
  StudentController.getStudentsById
);

// @route POST /api/student
router.post(
  "/",
  AuthMiddleware(["Admin", "OfficeStaff"]),
  StudentController.addStudent
);

// @route PUT /api/student/:id
router.put(
  "/:id",
  AuthMiddleware(["Admin", "OfficeStaff"]),
  StudentController.updateStudent
);

// @route DELETE /api/student/:id
router.delete(
  "/:id",
  AuthMiddleware(["Admin"]),
  StudentController.deleteStudent
);

module.exports = router;
