import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import { CiPaperplane } from "react-icons/ci";
import { GoPaperclip } from "react-icons/go";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import bgGradient2 from "../assets/images/bg-gradient-2.png";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBlogsProcess, editBlog } from '../thunk/blogThunk';
import { clearSelectedBlog } from '../features/blogSlice';
import { toast } from 'react-toastify';

const AddBlogs = () => {

 const category = [
    {
      categoryOption: "Personal Blog",
    },
    {
      categoryOption: "Entertainment",
    },
    {
      categoryOption: "LifeStyle",
    },
    {
      categoryOption: "Travel",
    },
    {
      categoryOption: "Technology",
    },
    {
      categoryOption: "Sustainability",
    },
    {
      categoryOption: "Nature",
    },
    {
      categoryOption: "Music",
    },
    {
      categoryOption: "Culture",
    },
    {
      categoryOption: "Business",
    },
    {
      categoryOption: "Sport",
    },
    {
      categoryOption: "Productivity and Self-Development",
    },
    {
      categoryOption: "Health and Fitness",
    },
    {
      categoryOption: "Gaming",
    },
    {
      categoryOption: "News and Politics",
    },
    {
      categoryOption: "Food and Cooking",
    },
  ];

  const [blog, setBlog] = useState({})
  const { selectedBlog } = useSelector(state => state.blog)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{

    if(selectedBlog){
      setBlog(selectedBlog)
    }else{
      setBlog({})
    }
  }, [selectedBlog])
  

  const handleChange = (e)=>{
    const {name, value, files} = e.target
    const newBlog = {...blog, [name]: files? files[0] : value}
    setBlog(newBlog)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()

    if(selectedBlog){
      dispatch(editBlog(blog))
      dispatch(clearSelectedBlog())
      navigate('/MyBlogs')
    }else{

      dispatch(addBlogsProcess(blog))
      toast.success('Blog Created')
      console.log(blog);

    }

    setBlog({})
    navigate('/')
    
  }

  return (
    <>
    <Header />

     <section
        className="bg-indigo-950 bg-cover w-full bg-no-repeat"
        style={{ backgroundImage: `url(${bgGradient2})` }}
      >
        <div className="flex items-center flex-col justify-between text-sm text-white max-md:px-4 text-center h-screen">
          <form
            action="#"
            method="post"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col items-center justify-center h-full"
          >
            <h1 className="text-4xl md:text-[40px]">
              {" "}
              What do you want to create?{" "}
            </h1>
            <p className="text-base mt-6">
              Create something amazing with your exprience.
            </p>
            <div className="w-170 bg-white rounded-lg overflow-hidden mt-4">
              <textarea
                className="w-full py-3 px-5 pb-0 resize-none outline-none bg-transparent text-black"
                placeholder="Tell us about your exprience"
                name="blogContent"
                onChange={handleChange}
                value={blog.blogContent || ''}
                rows={3}
                onInput={(e) => {
                  e.target.style.height = "";
                  e.target.style.height =
                    Math.min(e.target.scrollHeight, 260) + "px";
                }}
              />
              <div className="flex items-center justify-between pb-3 px-3">
                <label
                  className="flex items-center justify-center font-medium rounded-full cursor-pointer"
                  aria-label="Add"
                  htmlFor="blogFile"
                >
                  <GoPaperclip className="size-3 text-slate-500" />
                  <span className="text-xs text-slate-500 ms-1">Uploads</span>
                </label>
                <input
                  type="file"
                  name="blogCoverImage"
                  onChange={handleChange}  
                  id="blogFile"
                  className="hidden"
                />
                <button
                  className={`flex items-center justify-center p-1 ${selectedBlog? 'bg-green-500' : 'bg-indigo-600'} rounded size-6 cursor-pointer`}
                >
                  {selectedBlog? (<LiaCheckDoubleSolid />) : (<CiPaperplane />)}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 text-slate-400 w-full">
              <input
                type="text"
                name="title"
                onChange={handleChange}
                value={blog.title || ''}
                className="placeholder-slate-500 py-2 px-3 rounded-md bg-white text-black focus:outline-none"
                placeholder="Enter Title"
              />
              <select
                type="text"
                name="category"
                onChange={handleChange}
                value={blog.category || ''}
                className="py-2 px-3 focus:outline-none rounded-md bg-white text-black"
              >
                <option selected className="text-black">
                  --- Select Category ---
                </option>
                {category.map((val) => (
                  <option value={val.categoryOption} className="text-black">
                    {val.categoryOption}
                  </option>
                ))}
              </select>
              <div className="w-full h-px bg-gray-400/50" />
              <div className="w-full h-px bg-gray-400/50" />
              <p className="cursor-pointer">
                Can you translate something for me?
              </p>
              <p className="cursor-pointer">How can I be more productive?</p>
            </div>
          </form>
        </div>
      </section> 
    </>
  )
}

export default AddBlogs
