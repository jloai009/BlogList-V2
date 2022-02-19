import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import blogsService from '../../services/blogs'

export const blogsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.likes - a.likes,
})

const initialState = blogsAdapter.getInitialState({
  status: 'idle',
  error: 'null',
})

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await blogsService.getAll()
  return response
})

export const addNewBlog = createAsyncThunk(
  'blogs/addNewBlog',
  async (newBlog) => {
    const response = await blogsService.create(newBlog)
    return response.data
  }
)

export const likeBlog = createAsyncThunk('blogs/likeBlog', async (id) => {
  await blogsService.like(id)
  return id
})

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id) => {
  await blogsService._delete(id)
  return id
})

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
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBlogs.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        console.log(action.payload)
        blogsAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message
      })
      .addCase(addNewBlog.fulfilled, blogsAdapter.addOne)
      .addCase(likeBlog.fulfilled, (state, action) => {
        state.entities[action.payload].likes++
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        blogsAdapter.removeOne(state, action.payload)
      })
  },
})

export const { setBlogs, addBlog } = blogsSlice.actions

export default blogsSlice.reducer

export const {
  selectAll: selectAllBlogs,
  selectById: selectBlogById,
  selectIds: selectBlogIds,
} = blogsAdapter.getSelectors((state) => state.blogs)
