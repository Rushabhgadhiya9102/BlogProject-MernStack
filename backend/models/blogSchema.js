const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({

    title: {
        type:String,
        require:true
    },

    category: {
        type:String,
        require: true
    },

    blogContent:{
        type:String,
        require: true
    },

    blogCoverImage: {
        url: { type: String },
        public_id: { type: String },
    },

    blogAdditionalImage: {
        type: String,
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData"
    },

    likes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "UserData" 
    }],

    dislikes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "UserData" 
    }],

},{
    timestamps: true
})

const BlogData = mongoose.model('BlogData', blogSchema)
module.exports = BlogData