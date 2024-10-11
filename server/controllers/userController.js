const User = require("../models/User");

exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
