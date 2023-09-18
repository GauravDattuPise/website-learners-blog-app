const express = require("express");
const { createBlog, updateBlog, deleteBlog, getAllBlog, getUserBlogs, getBlog } = require("../controllers/blogController");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();


// BLOG CREATION
router.post("/create-blogs",authentication, createBlog);


// FETCH USER BLOGS
router.get("/getUserBlogs",authentication, getUserBlogs);


// FETCH ALL BLOGS
router.get("/getAllBlogs", getAllBlog)


// BLOG UPDATION
router.put("/update-blog/:blogId",authentication, updateBlog);



// BLOG DELETION
router.delete("/delete-blog/:blogId",authentication, deleteBlog);

module.exports = router