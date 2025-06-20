const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../uploads');

// Route to fetch all resumes (filtering only .doc and .pdf files)
router.get('/', (req, res) => {
  const files = fs.readdirSync(uploadsDir);

  // Filter files to include only .doc, .docx, and .pdf extensions
  const allowedExtensions = ['.doc', '.docx', '.pdf'];
  const resumes = files
    .filter(file => allowedExtensions.includes(path.extname(file).toLowerCase()))
    .map((file, index) => ({
      id: index + 1,
      name: path.basename(file, path.extname(file)),
      filePath: `/uploads/${file}`
    }));

  res.json(resumes);
});

// Route to download a specific resume
router.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadsDir, filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({ error: 'Error downloading file' });
      }
    });
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

module.exports = router;
