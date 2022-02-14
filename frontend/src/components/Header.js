import React from 'react'
import Notification from '../features/notification/Notification'

import { useSelector, useDispatch } from 'react-redux'
import { setLoggedUser } from '../features/users/usersSlice'

const Header = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.users.loggedUser)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setLoggedUser(null))
  }

  return (
    <div>
      <h2>Blog-List</h2>
      <Notification />
      <div>
        <p>
          {loggedUser.name} logged in&nbsp;
          <button onClick={handleLogout}>Logout</button>
        </p>
      </div>
    </div>
  )
}

export default Header
