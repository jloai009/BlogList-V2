import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    addBlog: (state, action) => {
      state.push(action.payload)
      state.sort((a, b) => b.likes - a.likes)
    }
  }
})

export const { setBlogs, addBlog } = blogsSlice.actions

export default blogsSlice.reducer
