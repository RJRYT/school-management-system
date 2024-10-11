const express = require("express");
const AuthMiddleware = require("../middleware/authMiddleware");
const {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");
const router = express.Router();

// Routes for Admin and Office Staff
router.get("/", AuthMiddleware(["admin", "office staff"]), getStudents);
router.post("/", AuthMiddleware(["admin", "office staff"]), createStudent);
router.put("/:id", AuthMiddleware(["admin", "office staff"]), updateStudent);
router.delete("/:id", AuthMiddleware(["admin"]), deleteStudent);

module.exports = router;
