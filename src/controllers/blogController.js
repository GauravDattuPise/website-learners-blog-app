const { default: mongoose } = require("mongoose");
const blogModel = require("../models/blogModel");


//---------------- CREATING BLOG ---------------

exports.createBlog = async (req, res) => {
    try {
        const data = req.body;
        let { title, description } = data;

        // blog fields validation
        if (!title) {
            return res.status(400).send({ status: false, message: "Blog title is required" });
        }

        if (!description) {
            return res.status(400).send({ status: false, message: "Blog description is required" });
        }

        // getting userId from request objet
        data.userId = req.userId

        // creating & returning blog
        const createdBlog = await blogModel.create(data);
        return res.status(201).send({ status: true, message: "Blog created Successfully", data: createdBlog })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}



// ----------------- FETCHING USER BLOGS --------------------------

exports.getUserBlogs = async (req, res) => {

    try {
        // getting userId form req object
        const id = req.userId

        const blogs = await blogModel.find({ userId: id, isDeleted: false }).select({ title: 1, description: 1 })
        if (blogs.length === 0) {
            return res.status(400).send({ status: false, message: "You have not posted any blog yet" })
        }
        return res.status(200).send({ status: true, message: "My blogs", totalBlogs: blogs.length, blogs });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}


// -------------------------  FETCHING ALL BLOGS ------------------------

exports.getAllBlog = async (req, res) => {

    try {
        const blogs = await blogModel.find({isDeleted: false}).select({ title: 1, description: 1 })
        return res.status(200).send({ status: true, message: "All blogs", totalBlogs: blogs.length, blogs });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}



// ----------------------  UPDATING BLOG  --------------------

exports.updateBlog = async (req, res) => {

    try {
        const userId = req.userId
        const { blogId } = req.params
        const data = req.body;

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please provide some field to update" })
        }

        let { title, description, ...restFields } = data;

        if (!mongoose.isValidObjectId(blogId)) {
            return res.status(400).send({ status: false, message: "invalid blogId" })
        }

        if (Object.keys(restFields).length > 0) {
            return res.status(400).send({ status: false, message: "You can only update blog title or description" })
        }

        // blog exists or not
        const isBlogExists = await blogModel.findOne({ _id: blogId, isDeleted: false })
        if (!isBlogExists) {
            return res.status(404).send({ status: false, message: "Blog not found" })
        }

        // authorization
        if (userId !== String(isBlogExists.userId)) {
            return res.status(403).send({ status: false, message: "You are not authorized" })
        }
        // updating fields of blog
        const updatedBlog = await blogModel.findByIdAndUpdate(blogId, { title: title, description: description }, { new: true });

        return res.status(200).send({ status: true, message: "Blog Updated Successfully", data: updatedBlog });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}



// -------------------------------- DELETING BLOG  -------------------

exports.deleteBlog = async (req, res) => {

    try {
        const userId = req.userId
        const { blogId } = req.params;

        if (!mongoose.isValidObjectId(blogId)) {
            return res.status(400).send({ status: false, message: "invalid blogId" })
        }

        const isBlogExists = await blogModel.findOne({ _id: blogId, isDeleted: false });
        if (!isBlogExists) {
            return res.status(404).send({ status: false, message: "Blog not found" })
        }

        // authorization
        if (userId !== String(isBlogExists.userId)) {
            return res.status(403).send({ status: false, message: "You are not authorized" })
        }

        isBlogExists.isDeleted = true
        // deleting blog
        await isBlogExists.save();
        return res.status(200).send({ status: true, message: "Blog Deleted Successfully" })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}