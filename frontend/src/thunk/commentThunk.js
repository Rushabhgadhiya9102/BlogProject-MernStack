import { createAsyncThunk } from "@reduxjs/toolkit"
import apiInstance from "../config/config"

export const getCommentData = createAsyncThunk('comment/getComment', async(blogId,{rejectWithValue})=>{

    try {
        
        const res = await apiInstance.get(`/getComments/${blogId}`)
        return res.data

    } catch (error) {
        return rejectWithValue(error.message)
    }

})

export const addComment = createAsyncThunk('comment/addComment', async ({ blogId, commentContent }, {rejectWithValue})=>{

    try {

        const res = await apiInstance.post(`/createComment/${blogId}`, {commentContent})
        return res.data
        
    } catch (error) {
        return rejectWithValue(error.message)

    }
    
})

export const deleteComment = createAsyncThunk('comment/deleteComment', async( _id, {rejectWithValue})=>{

    try{

        await apiInstance.delete(`/deleteComment/${_id}`)
        return _id

    }catch(error){
        console.log(error.message);
        
    }

})

export const editComment = createAsyncThunk('comment/editComment', async(comment, {rejectWithValue})=>{
    try {
        
        const {_id} = comment
        const res = await apiInstance.put(`/editcomment/${_id}`, comment)
        return res.data

    } catch (error) {
        
    }
})