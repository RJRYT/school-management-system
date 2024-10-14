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

exports.getStudentsById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }
    res.json({
      success: true,
      message: "Student details",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add new student
exports.addStudent = async (req, res) => {
  const {
    name,
    rollNumber,
    class: studentClass,
    section,
    dateOfBirth,
    gender,
    address,
    parentDetails,
  } = req.body;

  try {
    const newStudent = new Student({
      name,
      rollNumber,
      class: studentClass,
      section,
      dateOfBirth,
      gender,
      address,
      parentDetails,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json({ success: true, student: savedStudent });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    rollNumber,
    class: studentClass,
    section,
    dateOfBirth,
    gender,
    address,
    parentDetails,
    feesStatus,
  } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        name,
        rollNumber,
        class: studentClass,
        section,
        dateOfBirth,
        gender,
        address,
        parentDetails,
        feesStatus,
      },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, student: updatedStudent });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
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

    await Student.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};