import React from 'react';
import bgGradient2 from '../assets/images/bg-gradient-2.png';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { FaImage } from 'react-icons/fa6';
import { editProfileData } from '../thunk/editProfileThunk';
import { clearSelectedProfile } from '../features/profileSlice';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [editProfile, setEditProflie] = useState({});
  const { selectedProfile } = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedProfile) {
      setEditProflie(selectedProfile);
    } else {
      setEditProflie({});
    }
  }, [selectedProfile]);

  const handelChange = e => {
    const { name, value } = e.target;
    setEditProflie({ ...editProfile, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (selectedProfile) {
      dispatch(editProfileData(editProfile));
      dispatch(clearSelectedProfile());

      console.log('updated successfully');
      navigate('/About');
    }
  };

  return (
    <>
      <article className="bg-indigo-950 bg-cover w-full h-full" style={{ backgroundImage: `url(${bgGradient2})` }}>
        <section className="Profile">
          <div className="contianer mx-auto px-5 py-25 lg:max-w-7xl">
            <form method="post" encType="multipart/form-data" action="" onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className="border-b border-white/10 pb-12">
                  <h2 className="text-base/7 font-semibold text-white">Profile</h2>
                  <p className="mt-1 text-sm/6 text-gray-400">
                    This information will be displayed publicly so be careful what you share.
                  </p>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="username" className="block text-sm/6 font-medium text-white">
                        Username
                      </label>
                      <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                          <input
                            id="username"
                            type="text"
                            name="userName"
                            value={editProfile.userName || ''}
                            onChange={handelChange}
                            placeholder="janesmith"
                            className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label htmlFor="about" className="block text-sm/6 font-medium text-white">
                        About
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="about"
                          name="bio"
                          rows={3}
                          value={editProfile.bio || ''}
                          onChange={handelChange}
                          className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                      </div>
                      <p className="mt-3 text-sm/6 text-gray-400">Write a few sentences about yourself.</p>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm/6 font-medium text-white">Photo</label>
                      <div className="mt-2 flex items-center gap-x-3">
                        <IoPersonCircleOutline className="size-10 text-gray-600" />
                        <label
                          htmlFor="profileImage"
                          className="rounded-md cursor-pointer bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20"
                        >
                          Change
                        </label>
                        <input
                          type="file"
                          onChange={e => setEditProflie({ ...editProfile, profileImage: e.target.files[0] })}
                          accept="*image"
                          id="profileImage"
                          name="profileImage"
                          className="hidden"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-white">
                        Cover photo
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                        <div className="text-center">
                          <FaImage className="size-8 text-gray-600 mx-auto" />
                          <div className="mt-4 flex text-sm/6 text-gray-400">
                            <label
                              htmlFor="coverImage"
                              className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300"
                            >
                              <span>Upload a file</span>
                              <input
                                id="coverImage"
                                onChange={e => setEditProflie({ ...editProfile, coverImage: e.target.files[0] })}
                                type="file"
                                name="coverImage"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs/5 text-gray-400">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-b border-white/10 pb-12">
                  <h2 className="text-base/7 font-semibold text-white">Personal Information</h2>
                  <p className="mt-1 text-sm/6 text-gray-400">Use a permanent address where you can receive mail.</p>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 items-center">
                    <div className="sm:col-span-4">
                      <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={editProfile.email || ''}
                          onChange={handelChange}
                          autoComplete="email"
                          className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-4">
                      <a
                        href="/changePass"
                        className="bg-indigo-600 py-2 px-4 rounded-md text-white hover:bg-indigo-800"
                      >
                        Change Password
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b border-white/10 pb-12 mt-10">
                <h2 className="text-base/7 font-semibold text-white">Delete Account</h2>
                <p className="mt-1 text-sm/6 text-gray-400">
                  No longer want to use our service? You can delete your account here. This action is not reversible.
                  All information related to this account will be deleted permanently.
                </p>
                <div className="mt-5 space-y-10">
                  <a
                    href="/deleteAccount"
                    className="bg-red-500 hover:bg-red-700 cursor-pointer py-2 px-3 rounded-md text-white"
                  >
                    Delete My Account
                  </a>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <a href="/about" className="text-sm/6 font-semibold text-white">
                  Cancel
                </a>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-500 hover:bg-indigo-700 cursor-pointer px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </section>
      </article>
    </>
  );
};

export default EditProfile;
