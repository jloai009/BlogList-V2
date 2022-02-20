import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'

import { setErrorNotification } from '../notification/notificationSlice'
import { addBlogToUser } from '../users/usersSlice'
import blogsService from '../../services/blogs'

export const blogsAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    b.reactions.thumbsUp +
    b.reactions.hooray +
    b.reactions.heart +
    b.reactions.rocket +
    b.reactions.eyes -
    (a.reactions.thumbsUp +
      a.reactions.hooray +
      a.reactions.heart +
      a.reactions.rocket +
      a.reactions.eyes),
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
    } else {
      thunkAPI.dispatch(
        addBlogToUser({
          userId: response.data.user.id,
          blogId: response.data.id,
        })
      )
    }
    return {
      status: response.status,
      newBlog: response.data,
    }
  }
)

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

export const addComment = createAsyncThunk(
  'blogs/addComment',
  async ({ blogId, comment }) => {
    await blogsService.addComment(blogId, comment)
    return { blogId, comment }
  }
)

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
      .addCase(updateReactions.fulfilled, (state, action) => {
        state.entities[action.payload.blogId].reactions =
          action.payload.reactions
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        blogsAdapter.removeOne(state, action.payload)
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.entities[action.payload.blogId].comments.push(
          action.payload.comment
        )
      })
  },
})

export default blogsSlice.reducer

export const {
  selectAll: selectAllBlogs,
  selectById: selectBlogById,
  selectIds: selectBlogIds,
} = blogsAdapter.getSelectors((state) => state.blogs)
