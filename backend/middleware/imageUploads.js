const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({

    destination:(req,file,cb)=>{
        cb(null, "uploads/")
    },

    filename:(req,file,cb)=>{
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName)
    }

})

const imageUploads = multer({storage}).single('blogCoverImage')
module.exports = imageUploads