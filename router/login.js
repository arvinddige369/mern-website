// In your backend routes (e.g., auth.js)
const express = require('express');
const router = express.Router();
require('../db/conn');
const User = require("../model/userSchema"); // Replace with your User model
const bcrypt = require('bcrypt'); // Assuming passwords are hashed
const jwt = require('jsonwebtoken'); // For generating tokens

// app.get('/api/users', async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // console.log("Login requested:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: 'User not found' });
    }

    // console.log("User found:", user.email);
    // console.log("Password in DB:", user.password);
    // console.log("Password entered:", password);

    const isPasswordValid = password === user.password; // TEMPORARY — remove in production

    if (!isPasswordValid) {
      console.log("Invalid credentials");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
