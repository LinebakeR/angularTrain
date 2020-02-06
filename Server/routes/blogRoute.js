const express = require('express');
const router = express.Router();
const blogDao = require('./blogDao');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

//UPLOAD IMAGE
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, callback) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return callback(err);
      callback(null, raw.toString('hex') + path.extname(file.originalname));
    });
  },
});
const upload = multer({ storage: storage });

//upload file
router.post('/images', upload.single('images'), async (req, res) => {
  try {
    const img = req.file;
    if (!img.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return res.status(400).json({ msg: 'Only files please' });
    }
    res.status(201).json({ filename: img.filename, file: img });
  } catch (err) {
    console.log('error', err);
    res.status(500).json({ msg: 'Error when posted new image' });
  }
});

router.get('/allblogs', async (req, res) => {
  try {
    const blogs = await blogDao.getAllblogs();
    res.status(200).json(blogs);
    console.log('COUCOU');
  } catch (err) {
    res.status(500).json({ msg: 'Error when get all blogs' });
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log('id', id);
    const blog = await blogDao.getBlog(id);
    console.log('BLOG', blog);
    res.status(200).json(blog);
  } catch (err) {
    console.log('error when trying to catch blog', err);
    res.status(500).json(err);
  }
});

router.post('/create', async (req, res) => {
  try {
    const data = req.body;
    console.log('DATA', data);
    const addBlog = await blogDao.addPost(data);
    res.status(200).json(addBlog);
    if (!data) {
      console.log('No data to add or missing data ...');
    }
  } catch (err) {
    res.status(500).json({ msg: 'Error when add this post ...' });
  }
});

router.delete('/admin/:id', async (req, res) => {
  const id = req.params.id;
  console.log('ID', id);
  try {
    const deletingData = await blogDao.deletePost(id);
    console.log('DELETING admin', deletingData);
    res.status(200).json({ msg: 'Data deleted ...', deletingData });
  } catch (err) {
    console.log('Error when attempt to delete data');
  }
});

module.exports = router;
