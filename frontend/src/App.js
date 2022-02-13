import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import Content from './components/Content'
import blogService from './services/blogs'

const App = () => {

  const [notification, setNotification] = useState(null)
  const [errorOcurred, setErrorOcurred] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
    } catch (error) {
      window.localStorage.clear()
      window.location.reload()
    }

  }, [])

  const handleNotification = (notification, isError = false) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 5000)

    if (isError) {
      setErrorOcurred(true)
      setTimeout(() => {
        setErrorOcurred(false)
      }, 5000)
    }
  }


  const notificationProps = { notification, errorOcurred }
  const headerProps = { user, setUser, notificationProps }
  const contentProps = { handleNotification, user }
  const loginFormProps = {
    notificationProps,
    handleNotification,
    setUser
  }

  return (
    <div>
      {user ?
        <div>
          <Header {...headerProps} />
          <Content {...contentProps} />
        </div> :
        <LoginForm {...loginFormProps} />
      }
    </div>
  )
}

export default App