const User = require('../models/User');  // Corrected path
const passport = require('passport');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        req.logIn(user, (err) => {
            if (err) return next(err);
            res.status(200).json({ message: 'Logged in successfully' });
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Logged out successfully' });
};
