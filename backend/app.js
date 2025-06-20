const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const User1 = require('./model/userSchema_new');
const User = require('./model/userSchema');
const postRoutes = require('./router/posts');
const middleware = (req, res, next) => {
    console.log("Hello middleware");
    next();
}



dotenv.config({path: './config.env'});
require('./db/conn');
app.use(express.json());
app.use(cors())

app.use('/api/posts', postRoutes);
app.use(require('./router/auth'));
app.use(require('./router/auth_new'));

const path = require('path');
const fs = require('fs');
const resumeRoutes = require('./router/resumes');
// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Define your routes
app.use(require('./router/posts'));
const PORT = process.env.PORT;

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadsDir));

// Use resume routes
app.use('/api/resumes', resumeRoutes);



app.get('/', (req, res) => {
    res.send("Hello world Form Sever");
});

app.get('/about', middleware, (req, res) => {
    console.log("Hello About");
    res.send("Hello world Form about");
});

app.get('/getUserSchema', (req, res) =>{
    User1.find()
    .then(userschema => res.json(userschema))
    .catch(err => res.json(err))
})

app.put('/updateUser/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const updatedUser = await User1.findByIdAndUpdate(userId, req.body, { new: true });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  });
  
  app.put('/deleteUser/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const updatedUser = await User1.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
      res.json(updatedUser);
    } catch (error) {
      console.log("Error flagging user as deleted:", error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });

  app.get('/getUserSchemaNew', (req, res) =>{
    User.find()
    .then(userschema => res.json(userschema))
    .catch(err => res.json(err))
})

app.put('/updateUserNew/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const updatedUserNew = await User.findByIdAndUpdate(userId, req.body, { new: true });
      res.json(updatedUserNew);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  });
  
  app.put('/deleteUserNew/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const updatedUserNew = await User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
      res.json(updatedUserNew);
    } catch (error) {
      console.log("Error flagging user as deleted:", error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });

  

app.listen(PORT, () => {
    console.log(`port ${PORT} is runinig`);
})