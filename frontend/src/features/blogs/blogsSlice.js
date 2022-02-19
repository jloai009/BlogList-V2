import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import { setErrorNotification } from '../notification/notificationSlice'

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
  async (newBlog, thunkAPI) => {
    const response = await blogsService.create(newBlog)
    if (response.status !== 201) {
      thunkAPI.dispatch(setErrorNotification(response.message))
    }
    return {
      status: response.status,
      newBlog: response.data,
    }
  }
)

export const likeBlog = createAsyncThunk('blogs/likeBlog', async (id) => {
  await blogsService.like(id)
  return id
})

export const updateReactions = createAsyncThunk(
  'blogs/updateReactions',
  async (payload, thunkAPI) => {
    const { blogId, reaction } = payload
    const blog = thunkAPI.getState().blogs.entities[blogId]
    let newBlog = {
      ...blog,
      reactions: { ...blog.reactions },
    }
    newBlog.reactions[reaction]++
    const response = await blogsService.updateReactions(newBlog)
    return { blogId, reactions: response.data }
  }
)

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id) => {
  await blogsService._delete(id)
  return id
})

export const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBlogs.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        blogsAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message
      })
      .addCase(addNewBlog.fulfilled, (state, action) => {
        if (action.payload.status === 201) {
          blogsAdapter.addOne(state, action.payload.newBlog)
        }
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        state.entities[action.payload].likes++
      })
      .addCase(updateReactions.fulfilled, (state, action) => {
        state.entities[action.payload.blogId].reactions =
          action.payload.reactions
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        blogsAdapter.removeOne(state, action.payload)
      })
  },
})

export default blogsSlice.reducer

export const {
  selectAll: selectAllBlogs,
  selectById: selectBlogById,
  selectIds: selectBlogIds,
} = blogsAdapter.getSelectors((state) => state.blogs)
