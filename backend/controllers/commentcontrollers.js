const CommentData = require("../models/commentSchema")

exports.getComments = async(req,res)=>{

    try{

      const {id} = req.params
      const getComment = await CommentData.find({blog:id}).populate('author', 'userName profileImage')
      return res.json(getComment)

    }catch(error){
      console.log(error.message);

    }

}

exports.addCommentProcess = async (req, res) => {

    try {

      const { id } = req.params
      const { commentContent } = req.body;
      const userId = req.user._id;

      const newComment = await CommentData.create({
        blog: id,
        author: userId,
        commentContent,
      });

      const populatedComment = await newComment.populate(
        "author",
        "userName profileImage"
      );

      res.status(201).json(populatedComment);

    } catch (error) {
      res.status(500).json({ error: error.message });

    }
};

exports.deleteCommentProcess = async (req,res)=>{

    try {
        
        const commentId = req.params.id;
        const userId = req.user._id; 

        const comment = await CommentData.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.author.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You can only delete your own comment" });
        }

        await CommentData.findByIdAndDelete(commentId);
        res.json({ message: "Comment successfully deleted" });

    } catch (error) {
        console.log(error.message);

    }

}

exports.editCommentProcess = async (req,res)=>{

    try {
        
        const {id} = req.params;
        const {commentContent} = req.body

        const updatedComment = await CommentData.findByIdAndUpdate(id,{commentContent},{ new:true}).populate("author", "userName profileImage");
        res.json(updatedComment);

    } catch (error) {
        console.log(error.message);

    }

}
