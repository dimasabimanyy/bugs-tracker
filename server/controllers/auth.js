const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse(`Please provide ${!email ? "an email" : "a password"}`, 401))
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorResponse(`Invalid credentials`, 401))
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch)
      return res
        .status(404)
        .json({ success: false, error: "Invalid credentials" });

    res.status(200).json({
      success: true,
      token: "kratos sdfalkj",
    });
  } catch (e) {
    next(e)
  }
};

exports.forgotPassword = (req, res, next) => {
  res.send("Forgot password route");
};

exports.resetPassword = (req, res, next) => {
  res.send("Reset password route");
};
