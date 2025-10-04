import { createSlice } from "@reduxjs/toolkit"
import { editProfileData, getProfileData } from "../thunk/editProfileThunk"

const initialState = {
    profile:null,
    error: null,
    loading: false,
    selectedProfile : null,
    blogDetails: null,
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers:{
        setSelectedProfile: (state,action)=>{
            state.selectedProfile = action.payload
        },
        clearSelectedProfile: (state,action)=>{
            state.selectedProfile = null
        }
    },

    extraReducers:(builder)=>{

        // ================= fetch blog ================= //

        builder.addCase(getProfileData.pending,(state)=>{
            state.loading = true
        })

        builder.addCase(getProfileData.fulfilled,(state,action)=>{
            state.loading = false
            state.profile = action.payload
        })

        builder.addCase(getProfileData.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })

        
        // ================= edit blog =================== //

        builder.addCase(editProfileData.pending,(state)=>{
            state.loading = true
        })

        builder.addCase(editProfileData.fulfilled,(state,action)=>{
            state.loading = false
            state.profile = action.payload
        })

        builder.addCase(editProfileData.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        

    }
})

export const {setSelectedProfile, clearSelectedProfile} = profileSlice.actions
export default profileSlice.reducer