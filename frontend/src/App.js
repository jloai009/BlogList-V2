import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import Content from './components/Content'
import blogService from './services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { setLoggedUser } from './features/users/usersSlice'

const App = () => {
  const loggedUser = useSelector(state => state.users.loggedUser)
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        dispatch(setLoggedUser(user))
        blogService.setToken(user.token)
      }
    } catch (error) {
      window.localStorage.clear()
      window.location.reload()
    }

  }, [])

  return (
    <div>
      {loggedUser ?
        <React.Fragment>
          <Header />
          <Content />
        </React.Fragment> :
        <LoginForm />
      }
    </div>
  )
}

export default App