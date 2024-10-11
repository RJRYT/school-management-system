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

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // Update the student's details based on the request body
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Assuming you're passing the updated fields in the body
      { new: true, runValidators: true } // Return the updated document
    );

    res.json({
      success: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    await student.remove(); // Remove the student

    res.json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};