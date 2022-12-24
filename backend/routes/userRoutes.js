const express = require("express");
const { registerUser, authUser } = require("../controllers/userControllers");

const router = express.Router();

// route to register a new user
router.route("/").post(registerUser);
// route to authenticate the user using email and password
router.route("/login").post(authUser);

module.exports = router;
