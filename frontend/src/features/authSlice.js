import { createSlice } from "@reduxjs/toolkit";
import { signUpProcess, loginProcess, checkAuth } from "../thunk/authThunk";

const initialState = {
    users:[],
    loading: false,
    error: null,
    isAuthenticated:false
}

const authSlice = createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

        // ============== SIGN UP PROCESS ================ //

        builder.addCase(signUpProcess.pending, (state)=>{
            state.loading = true
        })

        builder.addCase(signUpProcess.fulfilled, (state,action)=>{
            state.loading = false
            state.users = action.payload.user
            state.isAuthenticated = true
        })

        builder.addCase(signUpProcess.rejected, (state,action)=>{
            state.loading = false
            state.error = action.error.message
        })

        // ============== LOGIN PROCESS ================ //

        builder.addCase(loginProcess.pending, (state)=>{
            state.loading = true
        })

        builder.addCase(loginProcess.fulfilled, (state,action)=>{
            state.loading = false
            state.users = action.payload.user
            state.isAuthenticated = true
        })

        builder.addCase(loginProcess.rejected, (state,action)=>{
            state.loading = false
            state.error = action.error.message
        })

        // ============== CHECK AUTHENTICATION ================ //

        builder.addCase(checkAuth.fulfilled, (state,action)=>{
            state.loading = false
            state.users = action.payload.user
            state.isAuthenticated = true
        })

        builder.addCase(checkAuth.rejected, (state,action)=>{
            state.loading = false
            state.error = action.error.message
            state.isAuthenticated = false
        })

    }
})

export default authSlice.reducer