const User = require("../models/userModel");
const asynHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

// create the new user if the user doesnot exist other wise throw the error
const registerUser = asynHandler(async (req, res) => {
  // extract the info during the sign up
  const { name, email, password, pic } = req.body;

  // check if the user exist or not
  const userExists = await User.findOne({ email });

  //   if user exist throw an error
  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }

  //   otherwise create the user
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  //   check whether the user is created successfully
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Error Occured!");
  }
});

// authenticate the user with the email and password and sending the jwt token as response
const authUser = asynHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { registerUser, authUser };
