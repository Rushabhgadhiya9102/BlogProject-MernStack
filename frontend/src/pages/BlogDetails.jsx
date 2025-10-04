import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogDetails } from "../thunk/blogThunk";
import { useParams } from "react-router-dom";
import { MdOutlineComment } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { addComment, getCommentData, deleteComment, editComment } from "../thunk/commentThunk";
import { FaTrashAlt } from "react-icons/fa";
import { HiPencilSquare } from "react-icons/hi2"
import { clearSelectedComment, setSelectedComment } from "../features/commentSlice";
import defaultImage from '../assets/images/default-avatar.jpg'

const BlogDetails = () => {
    
    const dispatch = useDispatch();
    const { id } = useParams();
    const { blogDetails, error, blogs } = useSelector((state) => state.blog);
    const { comments, selectedComment } = useSelector((state) => state.comment); 
    const { users } = useSelector((state) => state.auth); 

    const filterBlog = blogs.filter((blog) =>
        blog.category === blogDetails?.category && blog.id !== blogDetails.id
    );

    const sortedComments = [...comments].sort((a, b) => {
      
      const aIsCurrent = a.author?._id === users?._id;
      const bIsCurrent = b.author?._id === users?._id;

      if (aIsCurrent && !bIsCurrent) return -1;
      if (!aIsCurrent && bIsCurrent) return 1;
      return 0;
  });

    const [comment, setComment] = useState({});

    useEffect(() => {
      dispatch(getBlogDetails(id));
      dispatch(getCommentData(id));
    }, [dispatch, id]);

    useEffect(() => {
      if(selectedComment){
        setComment(selectedComment)
      }else{
        setComment({})
      }
    }, [selectedComment]);


    const handleChange = (e) => {
      const { name, value } = e.target;
      setComment({ ...comment, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if(selectedComment && comment._id){

        dispatch(editComment(comment))
        dispatch(clearSelectedComment())
        console.log("edit successfully", comment);

      }else{

         const commentData = {
          blogId: id,
          commentContent: comment.commentContent,
        };
      
        await dispatch(addComment(commentData));
        console.log(commentData);
        setComment({});

      }

    };

    const handleDelete = (_id)=>{
      dispatch(deleteComment(_id))
    }

    const handleEdit = (comment)=>{
      dispatch(setSelectedComment(comment)) 
    }

    if (error)
      return <p className="text-red-500 text-center text-5xl mt-5">{error}</p>;
    if (!blogDetails)
      return (
        <p className="text-gray-400 text-center text-5xl mt-5">No blog found.</p>
      );

  return (
    <>
      <Header />
      <article className="bg-indigo-950 h-full w-full bg-[url('../images/bg-gradient-2.png')] bg-cover bg-norepeat]">
        <section className="container mx-auto px-5 py-30 lg:max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* -------------- BLOG DETAILS START --------------- */}
            <div className="col-span-2">
              <div className="title text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold leading-tight tracking-tight my-5">
                  {blogDetails.title}
                </h2>
                <div className="author-info flex space-x-5 lg:space-x-10 text-xs lg:text-sm mb-10">
                  <p className="flex space-x-2 items-center">
                    <img
                      src={blogDetails.author.profileImage}
                      className="border w-6 h-6 rounded-full"
                      alt="author-image"
                    />
                    <span>By {blogDetails.author.userName}</span>
                  </p>

                  <p className="flex space-x-2 items-center">
                    <BsCalendarDate className="size-5" />
                    <span>
                      {new Date(blogDetails.createdAt).toLocaleDateString(
                        "en-GB",
                        { day: "2-digit", month: "long", year: "numeric" }
                      )}
                    </span>
                  </p>

                  <p className="flex space-x-2 items-center">
                    <MdOutlineComment className="size-5" />
                    <span>{comments.length}</span>
                  </p>
                </div>
              </div>

              <img
                src={blogDetails.blogCoverImage?.url}
                className="rounded-2xl w-full h-115 object-cover mb-10"
                alt="blog"
              />

              <div className="blog-content mx-auto">
                {blogDetails.blogContent.split("\n").map((line, index) => (
                  <p className="text-xs sm:text-sm lg:text-lg text-white mb-5">
                    {line}
                  </p>
                ))}
              </div>

              <div className="link-and-unlike">
                <a
                  href="/blogDetails/{ blog._id }/like"
                  className="text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                  </svg>
                  <span className="ml-1">({blogDetails.likes.length})</span>
                </a>

                <a
                  href="/blogDetails/{ blog._id }/dislike"
                  className="text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
                  </svg>
                  <span className="ml-1">({blogDetails.dislikes.length})</span>
                </a>
              </div>

              {/* -------------- BLOG DETAILS END --------------- */}

              {/* -------------- COMMENT SECTION START --------------- */}

              <div className="comment-section">
                <h4 className="title flex items-center text-2xl mb-5 mt-25 text-white font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-5 me-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                  Comments ( {comments.length} )
                </h4>

                <form action="#" method="post" onSubmit={handleSubmit}>
                  <textarea
                    name="commentContent"
                    value={comment.commentContent || ""}
                    onChange={handleChange}
                    id="comments"
                    placeholder="Write a Comment..."
                    className="w-full h-25 border rounded-lg bg-white p-3 mb-3 focus:outline-none"
                  ></textarea>
                  <button
                    className={`${selectedComment? 'bg-green-500':'bg-indigo-600'} hover:bg-indigo-800py-2 px-3 py-2 rounded font-medium text-white cursor-pointer`}
                  >
                    {selectedComment? 'Update Comment' : 'Add Comment'}
                  </button>
                </form>

                <div className="mt-5">
                  {sortedComments.map((val, index) => (
                    <div key={index} className="bg-indigo-900/30 mb-5 w-full max-w-[600px] space-y-4 p-3 rounded-md border border-gray-300/60 text-white text-sm">
                      <div className="flex justify-between items-center">
                        <p>
                          {new Date(val.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <p>“{val.commentContent}”</p>
                      <div className="flex">
                        <div className="flex items-center gap-2 ">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={ val.author.profileImage || defaultImage }
                            alt="userImage1"
                          />
                          <p className="text-white font-medium">
                            {val.author?.userName}
                          </p>
                        </div>

                          {val.author?._id === users._id && (
                            <div className="flex gap-x-1 items-center ms-auto">
                            <button onClick={()=>handleDelete(val._id)} className="text-red-500 cursor-pointer"><FaTrashAlt className="size-5" /></button>
                            <button onClick={()=>handleEdit(val)} className="text-indigo-600"><HiPencilSquare className="size-6" /></button>
                            </div>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* -------------- COMMENT SECTION END --------------- */}
            </div>

            {/* -------------- ASIDE RELATED POST SECTION START --------------- */}
            <div className="col-span-1">
              <aside className="sticky top-32 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <h2 className="text-xl font-semibold text-white mb-6 border-b border-gray-200 pb-2">
                  Related Posts
                </h2>
                <ul className="space-y-6 divide divide-y divide-gray-500">
                  {filterBlog > 0 ? (
                    filterBlog.slice(0, 6).map((val, index) => (
                      <li>
                        <a
                          href="/blogDetails/{ blog._id }"
                          className="flex items-start space-x-4 hover:bg-indigo-900 mb-5 rounded-lg p-2 transition"
                        >
                          <img
                            src="{ val.blogImage }"
                            alt="Post 1"
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                          <div>
                            <h3 className="text-white font-semibold transition">
                              {val.blogName}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {new Date(val.createdAt).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </a>
                      </li>
                    ))
                  ) : (
                    <h2 className="text-white font-medium text-lg text-center">
                      No related post
                    </h2>
                  )}
                </ul>
              </aside>
            </div>

            {/* <!-------------- ASIDE RELATED POST SECTION END ---------------> */}
          </div>
        </section>
      </article>
      <Footer />
    </>
  );
};

export default BlogDetails;
