const Library = require("../models/Library");

// Get library history
exports.getLibraryHistory = async (req, res) => {
  try {
    const libraryHistory = await Library.find();
    res.json(libraryHistory);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
