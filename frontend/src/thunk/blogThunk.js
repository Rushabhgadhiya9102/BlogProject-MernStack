import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../config/config";

export const getBlogData = createAsyncThunk('blog/getBlog', async(_,{rejectWithValue})=>{

    try{

        const res = await apiInstance.get('/getBlogs')
        return res.data

    }catch (error){
        return rejectWithValue(error.message)
        
    }

})

export const getBlogDetails = createAsyncThunk('blog/getBlogDetails', async(_id, {rejectWithValue})=>{
  
    try {
        
        const res = await apiInstance.get(`/blogDetails/${_id}`)
        return res.data

    } catch (error) {
        return rejectWithValue(error.message);

    }
    
})

export const addBlogsProcess = createAsyncThunk('blog/addBlog', async (blog, {rejectWithValue})=>{

try {
    
    const formData = new FormData()
    
    Object.keys(blog).forEach((key)=>{

        if(key === "blogCoverImage" && blog.blogCoverImage ){
            formData.append('blogCoverImage', blog[key])

        }else{
            formData.append(key, blog[key])

        }
    })
    
    const res = await apiInstance.post('/createBlog', formData)
    return res.data

} catch (error) {
    return rejectWithValue(error.message)

}
    
})

export const deleteBlog = createAsyncThunk('blog/deleteBlog', async(_id, {rejectWithValue})=>{

    try {
        
        await apiInstance.delete(`/deleteBlog/${_id}`)
        return _id

    } catch (error) {
        return rejectWithValue(error.message)
        
    }

})

export const editBlog = createAsyncThunk('blog/editBLog', async(blog, {rejectWithValue})=>{

    try {
        
        const {_id} = blog
        const formData = new FormData()

        Object.keys(blog).forEach((key)=>{

        if(key === "blogCoverImage" && blog.blogCoverImage ){
            formData.append('blogCoverImage', blog[key])

        }else{
            formData.append(key, blog[key])

        }
    })

    const res =  await apiInstance.put(`/editBlog/${_id}`, formData)
    return res.data

    } catch (error) {
       rejectWithValue(error.message) 

    }

})