const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { postComment, updateComment, deleteComment } = require("../controllers/commentController");
const router = express.Router();

// post comment
router.post("/post-comment", authentication, postComment)


// update comment
router.put("/update-comment/:blogId", authentication, updateComment)


// delete comment
router.delete("/delete-comment/:blogId", authentication, deleteComment)

module.exports = router