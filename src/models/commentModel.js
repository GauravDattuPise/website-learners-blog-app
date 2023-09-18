
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const commentSchema = new mongoose.Schema({

    comment : { 
        type : String,
        required : true
    },
    userId: {
       type : ObjectId,
       ref : "User"
    },
    blogId : {
         type : ObjectId,
         ref : "Blog"
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
