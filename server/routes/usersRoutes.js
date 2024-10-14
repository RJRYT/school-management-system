const express = require("express");
const router = express.Router();
const { AuthMiddleware } = require("../middleware");
const { UsersController } = require("../controllers");

// @route GET /api/users
router.get(
  "/",
  AuthMiddleware(["Admin"]),
  UsersController.getUsers
);

// @route GET /api/users/:id
router.get(
  "/:id",
  AuthMiddleware(["Admin"]),
  UsersController.getUserById
);

// @route POST /api/users
router.post(
  "/",
  AuthMiddleware(["Admin"]),
  UsersController.addNewUser
);

// @route PUT /api/users/:id
router.put(
  "/:id",
  AuthMiddleware(["Admin"]),
  UsersController.updateUser
);

// @route DELETE /api/users/:id
router.delete(
  "/:id",
  AuthMiddleware(["Admin"]),
  UsersController.deleteUser
);

module.exports = router;
