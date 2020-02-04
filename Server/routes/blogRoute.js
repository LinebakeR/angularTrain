const express = require("express");
const router = express.Router();
const blogDao = require("./blogDao");

router.get("/allblogs", async (req, res) => {
  try {
    const blogs = await blogDao.getAllblogs();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ msg: "Error when get all blogs" });
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id", id);
    const blog = await blogDao.getBlog(id);
    console.log('BLOG', blog)
    res.status(200).json(blog);
  } catch (err) {
    console.log("error when trying to catch blog", err);
    res.status(500).json(err);
  }
});

router.post("/addblog", async (req, res) => {
  try {
    const data = req.body;
    console.log("DATA", data);
    const addBlog = await blogDao.postBlog(data);
    res.status(200).json(addBlog);
    if (!data) {
      console.log("No data to add ...");
    }
  } catch (err) {
    res.status(500).json({ msg: "Error when add this post ..." });
  }
});

router.delete('/admin/:id', async (req,res) => {
  const id = req.params.id;
  console.log('ID', id)
  try{
    const deletingData = await blogDao.deletePost(id)
    console.log('DELETINGDA', deletingData)
    res.status(200).json({msg: 'Data deleted ...', deletingData})
  }catch(err){
    console.log('Error when attempt to delete data')
  }
})

module.exports = router;
