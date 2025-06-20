const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require("./model/userSchema"); // Update the path to your User model

const hashAndUpdatePasswords = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/sudhagad_new', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const users = await User.find(); // Fetch all users

    for (const user of users) {
      if (!user.password.startsWith('$2b$')) { // Check if password is already hashed
        const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the plain-text password
        user.password = hashedPassword; // Update the password field
        await user.save(); // Save the updated user
        console.log(`Password updated for user: ${user.email}`);
      }
    }

    console.log('All passwords hashed successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error hashing passwords:', error);
  }
};

hashAndUpdatePasswords();
