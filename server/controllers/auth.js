const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const { sendEmail } = require("../utils/sendEmail");
const crypto = require("crypto");

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
    return next(
      new ErrorResponse(
        `Please provide ${!email ? "an email" : "a password"}`,
        401
      )
    );
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse(`Invalid credentials`, 401));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch)
      return res
        .status(404)
        .json({ success: false, error: "Invalid credentials" });

    sendToken(user, 200, res);
  } catch (e) {
    next(e);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `http://localhost:3000/password-reset/${resetToken}`;

    const message = `
      <h1>You have requested a password reset</h1>
      <p>
      Please go to this link to reset your password
      </p>
      <a href=${resetUrl} clicktracking="off">${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password reset request",
        text: message,
      });

      res.status(200).json({ success: true, data: 'Email sent' });
    } catch (e) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (e) {
    next(e);
  }
};

exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
      return next(new ErrorResponse("Invalid token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(201).json({ successs: true, data: "Password reset success" })
  } catch (e) {
    next(e)
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
