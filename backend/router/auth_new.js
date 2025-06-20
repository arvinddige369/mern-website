const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
require('../db/conn');
const User = require("../model/userSchema_new");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
      // Generate a unique filename with the original extension
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const senderName = req.body.name || 'unknown-sender';
      const cleanName = senderName.replace(/\s+/g, '_').replace(/[^\w_-]/g, '');
      const newFileName = `${cleanName}-${Date.now()}-${file.originalname}`;
      cb(null, newFileName);
    }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.send("Hello world from server router js");
});

router.post('/register1', upload.single('file_up'), async (req, res) => {
    const { surname, name, f_name, dob, qualification, village, cont_no, email, occupation, profile, member, address, others, job } = req.body;
    const file = req.file;

    // Check if file is uploaded
    if (!file) {
        return res.status(400).send({ error: "No file uploaded" });
    }

    // Check if all required fields are provided
    if (!surname || !name || !f_name || !dob || !qualification || !village || !cont_no || !email || !occupation || !profile || !member || !address || !others || !job ) {
        return res.status(422).json({ error: "Please fill the field" });
    }

    try {
        // Check if the user already exists
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "User already exists" });
        }

        // Create and save new user
        const user = new User({ surname, name, f_name, dob, qualification, village, cont_no, email, occupation, profile, member, address, others, job });
        await user.save();

        // Send success response
        res.status(201).json({ message: "User registered successfully", file: file.filename });

    } catch (err) {
        // Handle errors
        console.error(err);
        if (!res.headersSent) {
            return res.status(500).json({ error: "Failed to register" });
        }
    }
});



module.exports = router;
