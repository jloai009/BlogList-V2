import React from 'react'
import Notification from '../features/notification/Notification'

const Header = (props) => {

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    props.setUser(null)
  }

  return (
    <div>
      <h2>Blog-List</h2>
      <Notification />
      <div>
        <p>
          {props.user.name} logged in&nbsp;
          <button onClick={handleLogout}>Logout</button>
        </p>
      </div>
    </div>
  )
}

export default Header
