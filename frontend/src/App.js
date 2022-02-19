import React, { useLayoutEffect } from 'react'
import LoginForm from './features/users/LoginForm'
import BlogList from './features/blogs/BlogList'
import blogService from './services/blogs'
import Navbar from './app/Navbar'
import Notification from './features/notification/Notification'
import NewBlogForm from './features/blogs/NewBlogForm'
import UsersList from './features/users/UserList'

import { useDispatch, useSelector } from 'react-redux'
import { setLoggedUser } from './features/users/usersSlice'

import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
  Link,
} from 'react-router-dom'

const App = () => {
  const loggedUser = useSelector((state) => state.users.loggedUser)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
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
  }, [dispatch])

  return (
    <Router>
      <Navbar />
      <Notification />
      {loggedUser ? null : (
        <section
          style={{
            fontWeight: 'bold',
            fontSize: 25,
            marginLeft: '15',
            textAlign: 'center',
          }}
        >
          <Link to="/login">Log in to Blog-List to share your own blogs!</Link>
        </section>
      )}
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <React.Fragment>
                {loggedUser ? <NewBlogForm /> : null}
                <BlogList />
              </React.Fragment>
            }
          />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/users" element={<UsersList />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
