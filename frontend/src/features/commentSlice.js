import { createSlice } from "@reduxjs/toolkit"
import { addComment, deleteComment, editComment, getCommentData } from "../thunk/commentThunk"

const initialState = {
    comments: [],
    loading: false,
    error:null,
    selectedComment: null
}


const CommentSlice = createSlice({
    name:"blogs",
    initialState,
    reducers:{
        setSelectedComment: (state,action)=>{
            state.selectedComment = action.payload
        },
        clearSelectedComment: (state,action)=>{
            state.selectedComment = null
        }
    },
    extraReducers: (builder)=>{

        // =========== GET COMMENTS ============= //

        builder.addCase(getCommentData.pending,(state)=>{
            state.loading = true
        })
        
        builder.addCase(getCommentData.fulfilled,(state,action)=>{
            state.loading = false
            state.comments = action.payload
        })

        builder.addCase(getCommentData.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.payload
        })

        // ============== ADD COMMENTS ============= //

        builder.addCase(addComment.pending,(state)=>{
            state.loading = true
        })
        
        builder.addCase(addComment.fulfilled,(state,action)=>{
            state.loading = false
            state.comments.unshift(action.payload)
        })

        builder.addCase(addComment.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.payload
        })

        // ============== DELETE COMMENTS ============= //

        builder.addCase(deleteComment.pending,(state)=>{
            state.loading = true
        })
        
        builder.addCase(deleteComment.fulfilled,(state,action)=>{
            state.loading = false
            state.comments = state.comments.filter(comment => comment._id !== action.payload)
        })

        builder.addCase(deleteComment.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.payload
        })

        // ============== EDIT COMMENTS ============= //

        builder.addCase(editComment.pending,(state)=>{
            state.loading = true
        })
        
        builder.addCase(editComment.fulfilled,(state,action)=>{
            state.loading = false
            state.comments = state.comments.map((comment) =>{
                if(comment._id === action.payload._id){
                    return action.payload
                }else{
                    return comment
                }
            })
        })

        builder.addCase(editComment.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.payload
        })

    }
})

export const {setSelectedComment, clearSelectedComment} = CommentSlice.actions
export default CommentSlice.reducer