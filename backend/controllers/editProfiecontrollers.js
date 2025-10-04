const UserData = require('../models/userSchema');
const cloudinary = require("../configs/cloudinary")

// ================== GET UPDATE PROFILE ================== //

exports.getProfile = async (req, res) => {
  const user = await UserData.findById(req.params.id);
  return res.json(user);
};

// ================ UPDATE PROFILE ================= //

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('req.body => ', req.body);
    const user = await UserData.findById(id);

    const { userName, email, password, bio } = req.body;

    let updatedFields = {
      userName: userName || user.userName,
      email: email || user.email,
      password: password || user.password,
      bio: bio || user.bio
    };

    // upload profileImage
    if (req.files?.profileImage) {
      const result = await cloudinary.uploader.upload(req.files.profileImage[0].path, { folder: 'MERNBlogUploads' });
      updatedFields.profileImage = result.secure_url;
    }

    // Upload coverImage
    if (req.files?.coverImage) {
      const result = await cloudinary.uploader.upload(req.files.coverImage[0].path, { folder: 'MERNBlogUploads' });
      updatedFields.coverImage = result.secure_url;
    }

    const updatedProfile = await UserData.findByIdAndUpdate(id, updatedFields, {
      new: true
    });

    console.log('updated profile successfully: ', updatedProfile);
    return res.json(updatedProfile);
  } catch (error) {
    console.log(error.message);
  }
};
