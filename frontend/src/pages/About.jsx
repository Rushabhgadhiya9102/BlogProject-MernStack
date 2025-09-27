import React from "react";
import bgGradient2 from "../assets/images/bg-gradient-2.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const About = () => {
  const { users } = useSelector((state) => state.auth);
  const { blogs } = useSelector((state) => state.blog);
  const uniqueCategories = [
    ...new Set(blogs.map((blog) => blog.category).filter(Boolean)),
  ];
  const myBlogs = blogs.filter((blog) => blog.author._id === users._id);

  return (
    <>
      <section
        className="bg-indigo-950 min-h-screen flex flex-col bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${bgGradient2})` }}
      >
        <div className="container px-5 mx-auto lg:max-w-7xl pb-40">
          {/* Cover Section */}

          <div className="relative h-56">
            {/* Cover Image */}

            <img
              src="<%= user.coverImage || '../../images/cover-image.png' %>"
              alt="Cover Image"
              className="w-full h-56 object-cover absolute top-0 left-0 opacity-60 rounded-b-2xl"
            />

            {/* Profile Picture */}

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <img
                src="<%= user.profileImage || '/images/default-avatar.png' %>"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
          </div>

          {/* Main Profile Content */}

          <div className="flex flex-col items-center mt-20 px-4">
            {/* Name & Tagline */}

            <h2 className="text-3xl font-bold text-white">{users.userName}</h2>
            <p className="text-white mt-1">{users.email}</p>
            <p className="text-gray-400 mt-1">
              Joined at :{" "}
              {users?.createdAt
                ? new Date(users.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "not available"}
            </p>

            {/* About Section */}

            <div className="max-w-2xl mt-8 text-center">
              <h2 className="text-xl font-semibold text-white mb-2">
                About Me
              </h2>
              <p className="leading-relaxed text-gray-400">
                {users.bio ? users.bio : "No Bio Added"}
              </p>
            </div>

            {/* Skills / Topics */}

            <div className="max-w-2xl mt-6">
              <h2 className="text-xl font-semibold text-white mb-3 text-center">
                Topics I Write About
              </h2>
              <div className="flex flex-wrap justify-center gap-2">
                {uniqueCategories.map((category, index) => (
                  <span
                    key={index}
                    className="bg-indigo-800 text-white px-3 py-1 rounded-sm text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Blogs */}

            <div className="max-w-4xl w-full mt-10">
              <h2 className="text-xl font-semibold text-white mb-5 text-center">
                Recent Blogs
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {myBlogs.length > 0 ? (
                  myBlogs.slice(0, 6).map((blog, index) => {
                    const { blogCoverImage, _id, title, category } = blog;

                    return (
                      <div className="category-item h-50 overflow-hidden rounded-4xl">
                        <div className="card relative hover:scale-102 duration-300 transition-all bg-cover bg-center w-full h-full">
                          <img src={ blogCoverImage?.url } className="w-full h-full" alt="blog-image" />
                          <div className="absolute top-0 bottom-0 left-0 right-0">
                            <div className="w-full h-full flex items-end bg-gradient-to-t from-black to-transparent">
                              <div className="content p-5 mx-auto text-center">
                                <Link
                                  to={`/BlogDetails/${_id}`}
                                  className="text-2xl hover:underline font-medium text-white"
                                >
                                  {title}
                                </Link>
                                <p className="text-lg font-medium text-gray-500">
                                  {category}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-center col-span-2"></p>
                )}
              </div>
            </div>
            {/* Contact Button */}
            <div className="mt-10 text-center">
              <div className="flex gap-x-3">
                <a
                  href="/editProfile"
                  className="bg-indigo-600 rounded-md py-1.5 px-7 text-white"
                >
                  Edit
                </a>
                <span className="border-r border-gray-600" />
                <a
                  href="/logout"
                  className="bg-red-600 rounded-md py-1.5 px-3 text-white"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
