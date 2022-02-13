import React, { useState } from 'react'
import Notification from './Notification'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


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
      props.handleNotification('Welcome Back ' + user.username)
    } catch (error) {
      props.handleNotification('Wrong username or password', 'Error')
    }
  }


  return (
    <div>
      <h2>Log in to Blog-List</h2>
      <Notification {...props.notificationProps} />
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
