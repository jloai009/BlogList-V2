import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import usersService from '../../services/users'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState({
  loggedUser: null,
  status: 'idle',
})

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await usersService.fetchUsers()
  return response.data
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoggedUser: (state, action) => {
      return {
        ...state,
        loggedUser: action.payload,
      }
    },
    addBlogToUser: (state, action) => {
      const { userId, blogId } = action.payload
      if (state.status !== 'idle') {
        state.entities[userId].blogs.push(blogId)
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      usersAdapter.upsertMany(state, action.payload)
      state.status = 'fulfilled'
    })
  },
})

export const { setLoggedUser, addBlogToUser } = usersSlice.actions

export default usersSlice.reducer

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state) => state.users)
