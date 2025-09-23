import React, { useEffect, useMemo } from "react";
import { getBlogData } from "../thunk/blogThunk";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import bgGradient2 from "../assets/images/bg-gradient-2.png";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Blogs = () => {
  const { blogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogData());
  }, []);

  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("category");

  const filteredBlogs = !selectedCategory
  ? blogs
  : blogs.filter(
      (blog) => blog.category?.toLowerCase() === selectedCategory.toLowerCase()
    );

  return (
    <>
    <Header/>
      <section
        className={`latest-work py-5 bg-cover bg-no-repeat w-full ${filteredBlogs.length===0 ? 'h-screen' :'h-full'} bg-indigo-950`}
        style={{ backgroundImage: `url(${bgGradient2})` }}
      >
        <div className="container px-5 mx-auto lg:max-w-7xl">
          <div className="title flex items-center justify-between mb-10">
            <span className="border-b-1 border-white w-full"></span>
            <h2 className="text-4xl text-white font-extrabold w-200 text-center">
              Latest Blogs
            </h2>
            <span className="border-b-1 border-white w-full"></span>
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="text-center text-white">
              <h2 className="text-3xl font-medium my-20">No Blogs Post</h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((val, index) => {
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
                        <div className="flex items-center justify-end mt-3">
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
            </div>
          )}
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Blogs;
