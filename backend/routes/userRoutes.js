const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddlewares");
const router = express.Router();

// route to register a new user
router.route("/").post(registerUser);
// route to authenticate the user using email and password
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateUserProfile);

module.exports = router;
