import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  text: "",
  timeout: null,
  isError: false,
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationReducer: (state, action) => {
      if (state.timeout) {
        clearTimeout(state.timeout)
      }
      return action.payload
    },
    clearNotification: state => {
      return initialState
    }
  }
})

export const setNotification = text => dispatch => {
  dispatch(notificationSlice.actions.setNotificationReducer({
    text,
    timeout: setTimeout(() => {
      dispatch(notificationSlice.actions.clearNotification())
    }, 5000),
    isError: false

  }))
}

export const setErrorNotification = text => dispatch => {
  dispatch(notificationSlice.actions.setNotificationReducer({
    text,
    timeout: setTimeout(() => {
      dispatch(notificationSlice.actions.clearNotification())
    }, 5000),
    isError: true

  }))
}

export default notificationSlice.reducer

