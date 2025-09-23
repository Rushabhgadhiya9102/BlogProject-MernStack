import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ================ IMAGES ================ //
import Logo from "../assets/images/logo.png";
import bgGradient2 from "../assets/images/bg-gradient-2.png";
import cultureImg from "../assets/images/culture-category.jpg";
import musicImg from "../assets/images/music-category.jpg";
import natureImg from "../assets/images/nature-category.jpg";
import technologyImg from "../assets/images/technology-category.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBlogData } from "../thunk/blogThunk";

const HomePage = () => {
  const { blogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogData());
  }, []);

  const categoryCard = [
    {
      image: cultureImg,
      title: "Culture",
      slogan: "Explore the World",
    },

    {
      image: musicImg,
      title: "Music",
      slogan: "Food for the Soul",
    },
    {
      image: natureImg,
      title: "Nature",
      slogan: "Breathtaking Beauty",
    },
    {
      image: technologyImg,
      title: "Technology",
      slogan: "Discover the future",
    },
  ];

  return (
    <>
      {/* ============ HEADER ============ */}
      <Header />

      <article
        className="bg-indigo-950 bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${bgGradient2})` }}
      >
        {/* =========== HERO SECTION ============= */}
        <section>
          <div className="flex h-screen justify-center items-center">
            <div className="container mx-auto flex justify-center px-4  sm:px-6  lg:px-8">
              <div className="text-center">
                <div className="image">
                  <img src={Logo} className="mx-auto" alt />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-slate-200 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">
                    <span className="mb-1 block">Turn every idea</span>
                    <span className="bg-gradient-to-r from-indigo-400 to-pink-600 bg-clip-text text-transparent">
                      into a binge-worthy
                    </span>
                  </span>
                  <div className="mt-2">
                    blog post
                    <span className="relative mt-3 whitespace-nowrap text-blue-600">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 418 42"
                        className="absolute top-3/4 left-0 right-0 m-auto h-[0.58em] w-fit fill-pink-400/50"
                        preserveAspectRatio="none"
                      >
                        <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                      </svg>
                      <span className="relative">— Effortlessly</span>
                    </span>
                  </div>
                </h1>
                <p className="mx-auto mt-3 max-w-xl text-lg text-gray-500 dark:text-slate-400 sm:mt-5 md:mt-5">
                  "Bring your ideas to life with clean, compelling blog posts
                  that grab attention and keep readers hooked — no stress, no
                  hassle."
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                  <div className="rounded-md shadow">
                    <Link
                      className="flex w-full items-center justify-center rounded-full border border-transparent bg-indigo-500 px-8 py-1 text-base font-medium text-white hover:bg-indigo-700 hover:scale-110 duration-300 md:py-2 md:px-8 md:text-lg"
                      to="/AddBlogs"
                    >
                      Get started 🚀
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="latest-work py-5">
          <div className="container px-5 mx-auto lg:max-w-7xl">
            <div className="title flex items-center justify-between mb-10">
              <span className="border-b-1 border-white w-full"></span>
              <h2 className="text-4xl text-white font-extrabold w-200 text-center">
                Latest Blogs
              </h2>
              <span className="border-b-1 border-white w-full"></span>
            </div>

            {blogs.length === 0 ? (
              <div className="text-center text-white">
                <h2 className="text-3xl font-medium my-20">No Blogs Post</h2>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.slice(0, 6).map((val, index) => {
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
                                {new Date(createdAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
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

        <section className="categories py-5">
          <div className="container mx-auto px-5 lg:max-w-7xl">
            <div className="title flex items-center justify-between mb-10">
              <span className="border-b-1 border-white w-full" />
              <h2 className="text-4xl text-white font-extrabold w-300 text-center">
                Featured Categories
              </h2>
              <span className="border-b-1 border-white w-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              {categoryCard.map((card, index) => {
                const { image, title, slogan } = card;

                return (
                  <a
                    href="/allBlogs?category=Culture"
                    className="category-item h-50 overflow-hidden rounded-4xl"
                  >
                    <div className="card hover:scale-102 duration-300 transition-all bg-cover bg-center w-full h-full" style={{backgroundImage: `url(${image})`}}>
                      <div className="w-full h-full flex items-end bg-gradient-to-t from-black to-transparent">
                        <div className="content p-5 mx-auto text-center">
                          <p className="text-2xl font-medium text-white">
                            {title}
                          </p>
                          <p className="text-lg font-medium text-gray-500">
                            {slogan}
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </article>

      {/* ========== FOOTER =========== */}
      <Footer />
    </>
  );
};

export default HomePage;
