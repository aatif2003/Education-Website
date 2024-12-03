// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate password (for simplicity, assuming plain text comparison)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not set in environment variables');
            process.exit(1); // Exit the process if JWT_SECRET is not found
        }
        

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: 'Login failed', details: err });
    }
});

module.exports = router;
