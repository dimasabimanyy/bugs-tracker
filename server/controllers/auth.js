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

    sendToken(user, 201, res);
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

    sendToken(user, 200, res);
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

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token })
}