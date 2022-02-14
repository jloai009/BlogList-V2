import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedUser: null,
  users: []
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoggedUser: (state, action) => {
      return {
        loggedUser: action.payload,
        users: state.users
      }
    }
  }
})

export const { setLoggedUser } = usersSlice.actions

export default usersSlice.reducer
