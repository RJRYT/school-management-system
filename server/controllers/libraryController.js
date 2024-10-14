const Library = require("../models/Library");

// Get library history
exports.getLibraryHistory = async (req, res) => {
  try {
    const histories = await Library.find().populate("studentId", "name rollNumber");

    res.json({ success: true, data: histories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addLibraryHistory = async (req, res) => {
  const { studentId, bookTitle, issueDate, returnDate } = req.body;

  try {
    const newHistory = new Library({
      studentId,
      bookTitle,
      issueDate,
      returnDate,
    });

    const savedHistory = await newHistory.save();
    res.status(201).json({
      success: true,
      data: savedHistory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateLibraryHistory = async (req, res) => {
  try {
    const updatedHistory = await Library.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedHistory) {
      return res.status(404).json({ success: false, message: "History not found" });
    }

    res.json({ success: true, data: updatedHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSingleLibraryHistory = async (req, res) => {
  try {
    const history = await Library.findById(req.params.id).populate("studentId", "name rollNumber");

    if (!history) {
      return res.status(404).json({ success: false, message: "History not found" });
    }

    res.json({ success: true, data: history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteLibraryHistory = async (req, res) => {
  try {
    const history = await Library.findByIdAndDelete(req.params.id);

    if (!history) {
      return res.status(404).json({ success: false, message: "History not found" });
    }

    res.json({ success: true, message: "History deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};