
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
