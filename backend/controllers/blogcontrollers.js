const cloudinary = require("../configs/cloudinary")
const fs = require('fs')
const BlogData = require("../models/blogSchema")

// ============== GET BLOG DETAILS =============== //

exports.getBlogs = async(req,res)=>{

        const blogs = await BlogData.find().populate("author").sort({ createdAt: -1 });
        return res.json(blogs)

    }

// ============== ADD BLOG PROCESS =============== //

exports.addBlogsProcess = async (req,res)=>{

    try {
        
        const user = req.user
        const result = await cloudinary.uploader.upload(req.file.path, {

            folder: 'MERNBlogUploads',
            allowed_formats: ["jpeg", "png", "jpg", "webp", "avif"],
            transformation: [{ width: 1200, crop: "limit" }]

        })

        const newBlog = await BlogData.create({
            ...req.body,
             blogCoverImage: {           
                url: result.secure_url,
                public_id: result.public_id
            },
            author:user._id
        })

        fs.unlink(req.file.path, (err) => {
            if (err) console.error("Error deleting local file:", err);
        });

        console.log(newBlog);
        return res.json(newBlog)
        

    } catch (error) {
        console.log(error.message);
        
    }

}

// ================ DELETE BLOG PROCESS ================ //

exports.deleteBlogProcess = async (req,res)=>{

    try {
        
        await BlogData.findByIdAndDelete(req.params.id)
        res.json({message: "successfully deleted"})

    } catch (error) {
        console.log(error.message);

    }

}

// ================ EDIT BLOG PROCESS ================= //


exports.editBlogProcess = async (req, res) => {
  try {


    const { id } = req.params;
    const blog = await BlogData.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const { title, blogContent, category } = req.body;
    
    let updatedFields = {
      title: title || blog.title,
      blogContent: blogContent || blog.blogContent,
      category: category || blog.category,
    };

    if (req.file) {
     
      if (blog.blogCoverImage?.public_id) {
        await cloudinary.uploader.destroy(blog.blogCoverImage.public_id);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "MERNBlogUploads",
        allowed_formats: ["jpeg", "png", "jpg", "webp", "avif"],
        transformation: [{ width: 1200, crop: "limit" }],
      });

      updatedFields.blogCoverImage = {
        public_id: result.public_id,
        url: result.secure_url,
      };

      fs.unlinkSync(req.file.path);
    }

 
    const updatedBlog = await BlogData.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    return res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};


// ================= GET BLOG DETAILS ================ //

exports.getBlogsDetails = async (req,res)=>{
        const blog = await BlogData.findById(req.params.id).populate('author')
        return res.json(blog)
    }