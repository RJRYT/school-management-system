const express = require("express");
const { AuthMiddleware } = require("../middleware");
const { StudentController } = require("../controllers");
const router = express.Router();

// Routes for Admin and Office Staff
router.get(
  "/",
  AuthMiddleware(["Admin", "OfficeStaff"]),
  StudentController.getStudents
);
router.get(
  "/:id",
  AuthMiddleware(["Admin", "OfficeStaff"]),
  StudentController.getStudentsById
);
router.post(
  "/",
  AuthMiddleware(["Admin", "OfficeStaff"]),
  StudentController.addStudent
);
router.put(
  "/:id",
  AuthMiddleware(["Admin", "OfficeStaff"]),
  StudentController.updateStudent
);
router.delete(
  "/:id",
  AuthMiddleware(["Admin"]),
  StudentController.deleteStudent
);

module.exports = router;
