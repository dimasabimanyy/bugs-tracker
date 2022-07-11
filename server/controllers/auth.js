const User = require("../models/User");

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
    res.status(500).json({ success: false, message: e.message });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: `Please provide ${!email ? "an email" : "a password"}`,
    });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(404).json({ success: false, error: "Invalid credentials" });
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
    res.status(500).json({ success: false, error: e.message });
  }
};

exports.forgotPassword = (req, res, next) => {
  res.send("Forgot password route");
};

exports.resetPassword = (req, res, next) => {
  res.send("Reset password route");
};
