import React, { useLayoutEffect } from 'react'
import LoginForm from './features/users/LoginForm'
import BlogList from './features/blogs/BlogList'
import blogService from './services/blogs'
import Navbar from './app/Navbar'
import Notification from './features/notification/Notification'
import NewBlogForm from './features/blogs/NewBlogForm'
import UsersList from './features/users/UserList'
import SingleUserPage from './features/users/SingleUserPage'
import SingleBlogPage from './features/blogs/SingleBlogPage'
import SignUpForm from './features/users/SignUpForm'
import LoginOrSignUp from './components/LoginorSignup'

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
      <LoginOrSignUp loggedUser={loggedUser} />
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
          <Route exact path="/blogs/:blogId" element={<SingleBlogPage />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/users" element={<UsersList />} />
          <Route exact path="/users/:userId" element={<SingleUserPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
