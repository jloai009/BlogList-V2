import React from 'react'
import Blog from './Blog'

import { useSelector } from 'react-redux'

const Showblogs = (props) => {
  const loggedUser = useSelector(state => state.users.loggedUser)

  return (
    <div>
      {props.blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={props.handleLike}
          handleDelete={props.handleDelete}
          loggedUser={loggedUser}
        />
      )}
    </div>
  )
}

export default Showblogs
