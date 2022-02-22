import React, { useState } from 'react'
import loginService from '../../services/login'
import usersService from '../../services/users'
import blogService from '../../services/blogs'

import { useDispatch } from 'react-redux'
import {
  setNotification,
  setErrorNotification,
} from '../notification/notificationSlice'
import { setLoggedUser } from '../users/usersSlice'

import { useNavigate } from 'react-router-dom'

const SignUpForm = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async () => {
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

  const handleSignUp = async () => {
    try {
      const response = await usersService.signUpUser({
        blogs: [],
        username,
        password,
      })
      if (response.status === 200) {
        handleLogin()
      }
    } catch (error) {
      if (password.length < 3) {
        dispatch(setErrorNotification('Password must be at least 3 characters'))
      } else {
        dispatch(setErrorNotification('Sorry, that username is already taken'))
      }
    }
  }

  return (
    <section>
      <h2>Sign Up:</h2>
      <form>
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
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </section>
  )
}

export default SignUpForm
