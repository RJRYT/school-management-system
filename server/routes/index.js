const express = require("express");
const { ErrorHandler } = require("../middleware");
const AuthRoutes = require("./authRoutes");
const FeesRoutes = require("./feesRoutes");
const LibraryRoutes = require("./libraryRoutes");
const StudentRoutes = require("./studentRoutes");
const UserRoutes = require("./userRoutes");

const router = express.Router();

router.get(["/", "/api"], (req, res) => {
  res
    .status(200)
    .json({
      success: true,
      message: "Welcome to school management system api.",
    });
});

router.use("/api/auth", AuthRoutes);
router.use("/api/fees", FeesRoutes);
router.use("/api/library", LibraryRoutes);
router.use("/api/student", StudentRoutes);
router.use("/api/user", UserRoutes);

router.use(ErrorHandler.NotFoundMiddleware);

module.exports = router;
