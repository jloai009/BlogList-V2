import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import Content from './components/Content'
import blogService from './services/blogs'

const App = () => {

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

  const headerProps = { user, setUser }
  const contentProps = { user }
  const loginFormProps = { setUser }

  return (
    <div>
      {user ?
        <React.Fragment>
          <Header {...headerProps} />
          <Content {...contentProps} />
        </React.Fragment> :
        <LoginForm {...loginFormProps} />
      }
    </div>
  )
}

export default App