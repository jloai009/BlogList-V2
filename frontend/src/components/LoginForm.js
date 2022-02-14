import React, { useState } from 'react'
import Notification from '../features/notification/Notification'
import loginService from '../services/login'
import blogService from '../services/blogs'

import { useDispatch } from 'react-redux'
import { setNotification, setErrorNotification } from '../features/notification/notificationSlice'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      props.setUser(user)
      dispatch(setNotification('Welcome Back ' + user.username))
    } catch (error) {
      dispatch(setErrorNotification('Wrong username or password'))
    }
  }


  return (
    <div>
      <h2>Log in to Blog-List</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          <label>Username: </label>
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => {
              setUsername(target.value)
            }}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => {
              setPassword(target.value)
            }}
          />
        </div>
        <button
          id="login-button"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
