import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setLoggedUser } from '../features/users/usersSlice'

import { Link } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.users.loggedUser)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setLoggedUser(null))
  }

  const LogoutButton = () => {
    return (
      <span>
        <i>{loggedUser.username} logged in&nbsp;</i>
        <button id="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </span>
    )
  }

  return (
    <nav>
      <section>
        <h1>Cool Coding Courses</h1>
        <p>A cool website to find and share cool coding resources!</p>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Courses</Link>
            <Link to="/users">Users</Link>
            {loggedUser ? null : (
              <React.Fragment>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </React.Fragment>
            )}
          </div>
          {loggedUser ? <LogoutButton /> : null}
        </div>
      </section>
    </nav>
  )
}

export default Header
