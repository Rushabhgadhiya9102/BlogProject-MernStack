import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../config/config";

// =============== SIGN UP PROCESS ================ //

export const signUpProcess = createAsyncThunk('auth/signUp', async(user, {rejectWithValue})=>{

    try {
        
        const res = await apiInstance.post('/signUp', user)
        return res.data

    } catch (error) {
        return rejectWithValue(error.message)
        
    }

})

// =============== LOGIN PROCESS ================ //

export const loginProcess = createAsyncThunk('auth/login', async(user, {rejectWithValue})=>{

    try {
        
        const res = await apiInstance.post('/login', user)
        return res.data

    } catch (error) {
        return rejectWithValue(error.message)
        
    }

})

// =============== CHECK AUTH ============== //

export const checkAuth = createAsyncThunk('auth/checkAuth', async(_,{rejectWithValue})=>{

    try {
        
        const res = await apiInstance.get('/checkAuth')
        return res.data

    } catch (error) {
        return rejectWithValue(error.message)

    }

})