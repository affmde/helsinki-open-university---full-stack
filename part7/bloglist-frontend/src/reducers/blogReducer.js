import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
  name: 'blog',
  initialState:[],
  reducers: {
    getAll(state, action){
      return action.payload
    },
    appendBlog(state, action){
      return state.concat(action.payload)
    },
    removeBlog(state, action){
      return state.filter(blog => blog.id !== action.payload.id)
    },
    vote(state, action){
      return state.map(blog => blog.id !== action.payload.id ? blog : { ...blog, votes: blog.votes+1 }
      )
    },
    addComment(state, action){
      return state.map(blog => blog.id !== action.payload.id ? blog : { ...blog, comments: [...blog.comments, action.payload.comment] })
    }
  }
})

export const { getAll, appendBlog, removeBlog, vote, addComment } = blogSlice.actions

export const getBlogs = () => {
  return async dispatch => {
    const response = await blogService.getAll()
    dispatch(getAll(response))
  }
}


export const createBlog = ( content ) => {
  return async dispatch => {
    const newBlog = await blogService.createBlog(content)
    dispatch(appendBlog(newBlog))
  }
}

export const delBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export const voteBlog = ( id, content ) => {
  return async dispatch => {
    await blogService.updateBlog(id, content)
    const payload ={
      id,
      content
    }
    dispatch(vote(payload))
  }
}

export const createComment = ( id, content ) => {
  return async dispatch => {
    const response = await blogService.createComment( id, content)
    console.log('content: ', content)
    console.log('response comment: ', response)
    dispatch(addComment(response.data))
  }
}
export default blogSlice.reducer