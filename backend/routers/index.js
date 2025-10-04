const { Router } = require('express')
const router = Router()
const authCtl = require('../controllers/authcontrollers')
const passport = require('../middleware/passport')
const imageUploads = require('../middleware/imageUploads')
const blogCtl  = require('../controllers/blogcontrollers')
const commentCtl = require('../controllers/commentcontrollers')
const ProfilerCtl = require('../controllers/editProfiecontrollers')

// ============= AUTHENTICATION =============== //

router.post('/signUp', authCtl.signUpProcess)
router.post('/login', passport.authenticate('local'), authCtl.loginProcess)
router.get('/checkAuth',passport.userAuth, authCtl.checkAuth)

// =============== BLOGS ================ //

router.get('/getBlogs', blogCtl.getBlogs)
router.get('/blogDetails/:id', blogCtl.getBlogsDetails)
router.post('/createBlog',passport.userAuth, imageUploads, blogCtl.addBlogsProcess)
router.delete('/deleteBlog/:id', blogCtl.deleteBlogProcess)
router.put('/editBlog/:id',passport.userAuth,imageUploads, blogCtl.editBlogProcess)

// ================== COMMENTS =============== //

router.get('/getComments/:id', commentCtl.getComments)
router.post('/createComment/:id',passport.userAuth, commentCtl.addCommentProcess)
router.delete('/deleteComment/:id', commentCtl.deleteCommentProcess)
router.put('/editcomment/:id', commentCtl.editCommentProcess)

// ================== EDIT PROFILE ================== //

router.get('/getProfile/:id', ProfilerCtl.getProfile)
router.put('/editProfile/:id',imageUploads, ProfilerCtl.updateProfile)

module.exports = router