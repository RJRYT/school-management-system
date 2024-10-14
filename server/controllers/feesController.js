const Fees = require("../models/Fees");

// Get fees history
exports.getFeesHistory = async (req, res) => {
  try {
    const feesHistory = await Fees.find();
    res.json(feesHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
