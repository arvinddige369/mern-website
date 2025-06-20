const express = require('express');
const router = express.Router();
const Post = require('../model/Post');
const multer = require('multer');
const path = require('path');

// Define the storage with an absolute path
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../uploads')); // Absolute path to 'uploads'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Add post route
router.post('/addPost', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : null;

    const newPost = new Post({
      title,
      description,
      image,
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully!' });
  } catch (error) {
    console.error('Error in /addPost route:', error);
    res.status(500).json({ message: 'Failed to create post', error });
  }
});

// Get all posts
router.get('/getPosts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});

// Get a single post by ID
router.get('/getPost/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Delete a post
router.delete('/deletePost/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a post
router.put('/updatePost/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updateData = { title, description };

    // If a new image is uploaded, include it in the update
    if (req.file) {
      updateData.image = `uploads/${req.file.filename}`;
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ message: 'Post updated successfully!', updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

module.exports = router;
