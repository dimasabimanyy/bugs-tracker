const User = require("../models/User");

exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.create({
            username,
            email,
            password
        });

        res.status(201).json({
            success: true,
            user
        })
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
}

exports.login = (req, res, next) => {
    res.send('Login route');
}

exports.forgotPassword = (req, res, next) => {
    res.send('Forgot password route');
}

exports.resetPassword = (req, res, next) => {
    res.send('Reset password route');
}