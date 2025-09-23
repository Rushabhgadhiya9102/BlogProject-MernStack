const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

    commentContent :{
        type:String,
        require:true
    },

    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "BlogData",
        require:true
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
        require:true
    }

},{
    timestamps: true
})

const CommentData = mongoose.model("CommentData", commentSchema)
module.exports = CommentData