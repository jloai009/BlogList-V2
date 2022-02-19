import React from 'react'
import Blog from './Blog'

import { useSelector } from 'react-redux'

const Showblogs = (props) => {
  const loggedUser = useSelector((state) => state.users.loggedUser)

  return (
    <div className="posts-list">
      <h2>Blogs</h2>
      {props.blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleDelete={props.handleDelete}
          loggedUser={loggedUser}
        />
      ))}
    </div>
  )
}

export default Showblogs
