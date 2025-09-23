import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogData } from "../thunk/blogThunk";
import { FaTrashAlt } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { HiPencilSquare } from "react-icons/hi2"
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { setSelectedBlog } from "../features/blogSlice";

const MyBlogs = () => {

    const { blogs } = useSelector((state) => state.blog);
    const { users } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getBlogData());
    }, []);

    const myBlogs = blogs.filter((blog) => blog.author._id === users._id);

    const handleDelete = (_id) => {
        dispatch(deleteBlog(_id));
    };

    const handleEdit = (blog)=>{
      dispatch(setSelectedBlog(blog))
      navigate('/AddBlogs')
    }

  return (
    <>
      <Header />
      <section className="my-work py-5 bg-indigo-950">
        <div className="container px-5 mx-auto lg:max-w-7xl">
          <div className="title flex items-center justify-between mb-10">
            <span className="border-b-1 border-white w-full"></span>
            <h2 className="text-4xl text-white font-extrabold w-200 text-center">
              My Blogs
            </h2>
            <span className="border-b-1 border-white w-full"></span>
          </div>

          {blogs.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="text-center text-white">
                <Link to="/AddBlogs" className="w-full">
                  <div className="flex flex-col justify-center items-center h-120 rounded-2xl bg-neutral-800/50 text-gray-500">
                    <FaCirclePlus className="size-15 mb-3" />
                    <p className="text-center text-3xl font-bold">Add Blogs</p>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myBlogs.map((val, index) => {
                const {
                  title,
                  author,
                  category,
                  createdAt,
                  blogCoverImage,
                  _id,
                } = val;

                const now = new Date();
                const created = new Date(createdAt);

                const seconds = now - created;
                const minutes = Math.floor(seconds / 1000 / 60);
                const hours = Math.floor(minutes / 60);
                const days = Math.floor(hours / 24);

                let timeAgo = "";

                if (minutes < 1) {
                  timeAgo = "Just Now";
                } else if (minutes < 60) {
                  timeAgo = minutes + " Minutes Ago";
                } else if (hours < 24) {
                  timeAgo = hours + " Hours Ago";
                } else {
                  timeAgo = days + " Days Ago";
                }

                return (
                  <div
                    key={index}
                    className="bg-black group text-white overflow-hidden rounded-2xl relative w-full h-120"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={blogCoverImage?.url}
                        alt="blog-image"
                        className="h-90 w-full group-hover:scale-105 transition-all duration-300 object-cover object-center"
                      />
                      <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
                    </div>
                    <div className="px-4 pb-4">
                      <p className="category-name absolute right-5 top-5 py-1 px-2 rounded bg-indigo-900 text-center text-sm text-white">
                        {category}
                      </p>
                      <div className="absolute bottom-5 left-0 right-0 px-3 text-white">
                        <div className="flex justify-between items-end border-b-1 pb-3">
                          <Link
                            to={`/BlogDetails/${_id}`}
                            className="text-xl hover:underline"
                          >
                            {" "}
                            {title?.length > 25
                              ? title.substring(0, 25) + "..."
                              : title || "Untitled Blog"}
                          </Link>
                          <span className="text-sm">{author.userName}</span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex gap-x-3">
                            <button
                              onClick={() => handleDelete(_id)}
                              className="text-red-500 cursor-pointer"
                            >
                              <FaTrashAlt className="size-5" />
                            </button>
                            <button
                              onClick={() => handleEdit(val)}
                              className="text-indigo-600 cursor-pointer"
                            >
                              <HiPencilSquare className="size-6" />
                            </button>
                          </div>

                          <p className="text-end text-sm flex space-x-3">
                            <span className="capitalize">
                              {new Date(createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>

                            <span className="capitalize">{timeAgo}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="text-center text-white">
                <Link to="/AddBlogs" className="w-full">
                  <div className="flex flex-col justify-center items-center h-120 rounded-2xl bg-neutral-800/50 text-gray-500">
                    <FaCirclePlus className="size-15 mb-3" />
                    <p className="text-center text-3xl font-bold">Add Blogs</p>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MyBlogs;
