import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

import { useDispatch } from 'react-redux'
import {
  setNotification,
  setErrorNotification,
} from '../features/notification/notificationSlice'
import { setLoggedUser } from '../features/users/usersSlice'

import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setLoggedUser(user))
      dispatch(setNotification('Welcome Back ' + user.username))
      navigate('/')
    } catch (error) {
      dispatch(setErrorNotification('Wrong username or password'))
    }
  }

  return (
    <section>
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
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </section>
  )
}

export default LoginForm
