
// user can
// 1. comment
// 2. update own comment
// 3. deleted own comment

const { default: mongoose } = require("mongoose");
const blogModel = require("../models/blogModel");
const commentModel = require("../models/commentModel");

// ---------------------  posting comment on blog -------------------

exports.postComment = async (req, res) => {
    try {

        const userId = req.userId
        const commentData = req.body
        const { comment, blogId } = commentData

        if (!comment) {
            return res.status(400).send({ status: false, message: "comment field is required" });
        }
        if (!blogId) {
            return res.status(400).send({ status: false, message: "blogId field is required" });
        }

        // format of blogId
        if (!mongoose.isValidObjectId(blogId)) {
            return res.status(400).send({ status: false, message: "invalid blogId" })
        }

        // blog exists or not
        const isBlogExists = await blogModel.findOne({ _id: blogId, isDeleted: false })
        if (!isBlogExists) {
            return res.status(404).send({ status: false, message: "Blog not found" })
        }

        // // authorization need for update comment and delete comment
        // if (userId !== String(isBlogExists.userId)) {
        //     return res.status(403).send({ status: false, message: "You are not authorized" })
        // }

        // adding field
        commentData.userId = userId

        // post comment
        const savedComment = await commentModel.create(commentData);

        return res.status(201).send({ status: true, message: "comment added successfully", comment: savedComment })

    } catch (error) {
        return res.status(500).send({ status: false, message: "server error in post commnet", error: error.message })
    }
}



// ---------------------  updating comment of blog -------------------

exports.updateComment = async (req, res) => {
    try {
        const userId = req.userId
        const { blogId } = req.params
        const commentData = req.body
        const { comment, commentId } = commentData

        // validations
        if (!blogId) {
            return res.status(400).send({ status: false, message: "blogId is required " });
        }
        if (!comment) {
            return res.status(400).send({ status: false, message: "comment field is required" });
        }
        if (!commentId) {
            return res.status(400).send({ status: false, message: "commentId field is required" });
        }

        // format of blogId
        if (!mongoose.isValidObjectId(blogId)) {
            return res.status(400).send({ status: false, message: "invalid blogId" })
        }

        // format of commentId
        if (!mongoose.isValidObjectId(commentId)) {
            return res.status(400).send({ status: false, message: "invalid commentId" })
        }

        // blog exists or not
        const isBlogExists = await blogModel.findOne({ _id: blogId, isDeleted: false })
        if (!isBlogExists) {
            return res.status(404).send({ status: false, message: "Blog not found" })
        }

        // comment exists or not
        const isCommentExists = await commentModel.findOne({ _id: commentId, isDeleted: false })
        if (!isCommentExists) {
            return res.status(404).send({ status: false, message: "comment not found" })
        }

        // authorization to update comment
        if (userId !== String(isBlogExists.userId) || userId !== String(isCommentExists.userId)) {
            return res.status(403).send({ status: false, message: "You are not authorized" })
        }

        // updating comment field
        isCommentExists.comment = comment;
        await isBlogExists.save();

        return res.status(200).send({ status: true, message: "comment updated successfully", updatedComment: isCommentExists })
   
    } catch (error) {
        return res.status(500).send({ status: false, message: "server error in update commnet", error: error.message })
    }
}



// ---------------------- delete comment

exports.deleteComment = async (req,res) => {

    try {
        const userId = req.userId
        const { blogId } = req.params
        const commentData = req.body
        const { commentId } = commentData

        // validations
        if (!blogId) {
            return res.status(400).send({ status: false, message: "blogId is required " });
        }
        if (!commentId) {
            return res.status(400).send({ status: false, message: "commentId field is required" });
        }

        // format of blogId
        if (!mongoose.isValidObjectId(blogId)) {
            return res.status(400).send({ status: false, message: "invalid blogId" })
        }

        // format of commentId
        if (!mongoose.isValidObjectId(commentId)) {
            return res.status(400).send({ status: false, message: "invalid commentId" })
        }

        // blog exists or not
        const isBlogExists = await blogModel.findOne({ _id: blogId, isDeleted: false })
        if (!isBlogExists) {
            return res.status(404).send({ status: false, message: "Blog not found" })
        }

        // comment exists or not
        const isCommentExists = await commentModel.findOne({ _id: commentId, isDeleted: false })
        if (!isCommentExists) {
            return res.status(404).send({ status: false, message: "comment not found" })
        }

        // authorization to update comment
        if (userId !== String(isBlogExists.userId) || userId !== String(isCommentExists.userId)) {
            return res.status(403).send({ status: false, message: "You are not authorized" })
        }

        // deleting comment
        isCommentExists.isDeleted = true;
        await isCommentExists.save();

        return res.status(200).send({ status: true, message: "comment deleted successfully" })
   
    } catch (error) {
        return res.status(500).send({ status: false, message: "server error in delete commnet", error: error.message })
    }
}
