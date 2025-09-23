import { createSlice } from "@reduxjs/toolkit"
import { addBlogsProcess, deleteBlog, editBlog, getBlogData, getBlogDetails } from "../thunk/blogThunk"

const initialState = {
    blogs:[],
    error: null,
    loading: false,
    selectedBlog : null,
    blogDetails: null,
}

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers:{
        setSelectedBlog: (state,action)=>{
            state.selectedBlog = action.payload
        },
        clearSelectedBlog: (state,action)=>{
            state.selectedBlog = null
        }
    },

    extraReducers:(builder)=>{

        // ================= fetch blog ================= //

        builder.addCase(getBlogData.pending,(state)=>{
            state.loading = true
        })

        builder.addCase(getBlogData.fulfilled,(state,action)=>{
            state.loading = false
            state.blogs = action.payload
        })

        builder.addCase(getBlogData.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })

        // ================= fetch single blog details ================= //

        builder.addCase(getBlogDetails.pending,(state)=>{
            state.loading = true
        })

        builder.addCase(getBlogDetails.fulfilled,(state,action)=>{
            state.loading = false
            state.blogDetails = action.payload
        })

        builder.addCase(getBlogDetails.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })

        // ================= create blog =================== //

        builder.addCase(addBlogsProcess.pending,(state)=>{
            state.loading = true
        })

        builder.addCase(addBlogsProcess.fulfilled,(state,action)=>{
            state.loading = false
            state.blogs.push(action.payload)
        })

        builder.addCase(addBlogsProcess.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        
        // ================= delete blog =================== //

        builder.addCase(deleteBlog.pending,(state)=>{
            state.loading = true
        })

        builder.addCase(deleteBlog.fulfilled,(state,action)=>{
            state.loading = false
            state.blogs = state.blogs.filter(blog => blog._id !== action.payload)
        })

        builder.addCase(deleteBlog.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        
        // ================= edit blog =================== //

        builder.addCase(editBlog.pending,(state)=>{
            state.loading = true
        })

        builder.addCase(editBlog.fulfilled,(state,action)=>{
            state.loading = false
            state.blogs = state.blogs.map((blog) => {
                if(blog._id === action.payload._id){
                    return action.payload
                }else{
                    return blog
                }
            })
        })

        builder.addCase(editBlog.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        

    }
})

export const {setSelectedBlog, clearSelectedBlog} = blogSlice.actions
export default blogSlice.reducer