const express = require('express');
const router = express.Router();
const blogDao = require('./blogDao');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

let imgUpload = '';
//UPLOAD IMAGE
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads');
  },
  filename: (req, file, callback) => {
    imgUpload = file.originalname.toString('hex');
    console.log('imgUpload: ', imgUpload);
    callback(null, imgUpload);
  },
});
const upload = multer({ storage: storage });

//upload file
router.post('/images', upload.single('images'), async (req, res) => {
  try {
    const img = req.file;
    img.filename = imgUpload;
    console.log('FILE', img);
    if (!img) {
      delete img;
    }
    if (!img.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return res.status(400).json({ msg: 'Only images files please' });
    }
    await res.status(201).send({ filename: img.filename, file: img, msg: 'picture uploaded' });
  } catch (err) {
    console.log('error', err);
    res.status(500).json({ msg: 'Error when posted new image' });
  }
});

router.get('/upImg/:img', async (req, res) => {
  try {
    const img = req.params.img;
    const upImg = await blogDao.getImg(img);
    res.status(200).json(console.log('upIMG', upImg));
    console.log('UPIMG FROM BACK', upImg);
    console.log('IMG FROM BACK', img);
  } catch (err) {
    console.log('error when try to load image', err);
  }
});

router.get('/allblogs', async (req, res) => {
  try {
    const blogs = await blogDao.getAllblogs();
    console.log('blogs', blogs);
    res.status(200).json(blogs);
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
    data.images = imgUpload;
    console.log('DATA', data);
    blogDao.addPost(data);
    res.status(200).json(data);
    if (data.images.length <= 0) {
      delete data.images;
      delete imgUpload;
    }
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
    console.log('DELETING post id: ', id);
    res.status(200).json({ msg: 'Data deleted ...', deletingData });
  } catch (err) {
    console.log('Error when attempt to delete data');
  }
});

module.exports = router;
