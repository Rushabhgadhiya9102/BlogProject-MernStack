import { createAsyncThunk } from "@reduxjs/toolkit"
import apiInstance from "../config/config"

// ================= GET PROFILE =================== //

export const getProfileData = createAsyncThunk('profile/getProfile', async(id,{rejectWithValue})=>{

    try{

        const res = await apiInstance.get(`/getProfile/${id}`)
        return res.data

    }catch (error){
        return rejectWithValue(error.message)
        
    }

})

// ================= EDIT PROFILE ================= //

export const editProfileData = createAsyncThunk('profile/editProfile', async(profile, {rejectWithValue})=>{

    try {
        
        const {_id, profileImage, coverImage} = profile
        const formData = new FormData()

        Object.keys(profile).forEach((key)=>{

        if(key === "profileImage" && profile.profileImage ){
            formData.append('profileImage', profile[key])

        }else if(key === 'coverImage' && profile.coverImage){
            formData.append('coverImage', profile[key])

        }else{
            formData.append(key , profile[key])
        }
    })

    const res =  await apiInstance.put(`/editProfile/${_id}`, formData)
    return res.data

    } catch (error) {
       rejectWithValue(error.message) 

    }

})