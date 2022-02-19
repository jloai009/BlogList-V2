import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState({
  loggedUser: null,
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoggedUser: (state, action) => {
      return {
        loggedUser: action.payload,
      }
    },
  },
})

export const { setLoggedUser } = usersSlice.actions

export default usersSlice.reducer
