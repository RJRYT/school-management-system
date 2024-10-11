const Student = require("../models/Student");

// Get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add new student
exports.addStudent = async (req, res) => {
  const { name, classLevel, age } = req.body;

  try {
    const newStudent = new Student({ name, classLevel, age });
    const savedStudent = await newStudent.save();
    res.json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
