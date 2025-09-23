const { Router } = require('express')
const router = Router()
const { signUpProcess, loginProcess, checkAuth } = require('../controllers/authcontrollers')
const passport = require('../middleware/passport')
const imageUploads = require('../middleware/imageUploads')
const blogCtl  = require('../controllers/blogcontrollers')
const { getComments, addCommentProcess, deleteCommentProcess, editCommentProcess } = require('../controllers/commentcontrollers')

// ============= AUTHENTICATION =============== //

router.post('/signUp', signUpProcess)
router.post('/login', passport.authenticate('local'), loginProcess)
router.get('/checkAuth',passport.userAuth, checkAuth)

// =============== BLOGS ================ //

router.get('/getBlogs', blogCtl.getBlogs)
router.get('/blogDetails/:id', blogCtl.getBlogsDetails)
router.post('/createBlog',passport.userAuth, imageUploads, blogCtl.addBlogsProcess)
router.delete('/deleteBlog/:id', blogCtl.deleteBlogProcess)
router.put('/editBlog/:id',passport.userAuth,imageUploads, blogCtl.editBlogProcess)

// ================== COMMENTS =============== //

router.get('/getComments/:id', getComments)
router.post('/createComment/:id',passport.userAuth, addCommentProcess)
router.delete('/deleteComment/:id', deleteCommentProcess)
router.put('/editcomment/:id', editCommentProcess)

module.exports = router