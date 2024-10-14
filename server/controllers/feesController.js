const { Fees } = require("../models");

// Get fees history
exports.getFeesHistory = async (req, res) => {
  try {
    const histories = await Fees.find({}).populate("studentId", "name");
    res.json({ success: true, data: histories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getFeesHistoryById = async (req, res) => {
  try {
    const history = await Fees.findById(req.params.id).populate("studentId", "name");
    if (!history) return res.status(404).json({ message: "Fees history not found" });
    res.json({ success: true, data: history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.addNewFeesHistory = async (req, res) => {
  try {
    const newHistory = await Fees.create(req.body);
    res.status(201).json({
      success: true,
      data: newHistory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.updateFeesHistory = async (req, res) => {
  try {
    const updatedHistory = await Fees.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHistory) return res.status(404).json({ message: "Fees history not found" });
    res.json({ success: true, data: updatedHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.deleteFeesHistory = async (req, res) => {
  try {
    const deletedHistory = await Fees.findByIdAndDelete(req.params.id);
    if (!deletedHistory) return res.status(404).json({ message: "Fees history not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};