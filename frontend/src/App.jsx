import React, { useEffect } from 'react'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { checkAuth } from './thunk/authThunk'
import AddBlogs from './pages/AddBlogs'
import MyBlogs from './pages/MyBlogs'
import BlogDetails from './pages/BlogDetails'
import Categories from './pages/Categories'
import Blogs from './pages/Blogs'
import About from './pages/About'
import EditProfile from './pages/EditProfile'

const App = () => {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path='/SignUpPage' element={<SignUpPage />} />
        <Route path='/LoginPage' element={<LoginPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/AddBlogs' element={<AddBlogs />} />
        <Route path='/MyBlogs' element={<MyBlogs />} />
        <Route path='/BlogDetails/:id' element={<BlogDetails />} />
        <Route path='/Categories' element={<Categories />} />
        <Route path='/Blogs' element={<Blogs />} />
        <Route path='/About' element={<About />} />
        <Route path='/EditProfile' element={<EditProfile />} />
      </Routes>
    </>
  )
}

export default App
