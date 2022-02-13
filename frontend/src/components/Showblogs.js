import React from 'react'
import Blog from './Blog'

const Showblogs = (props) => (
  <div>
    {props.blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        handleLike={props.handleLike}
        handleDelete={props.handleDelete}
        user={props.user}
      />
    )}
  </div>
)

export default Showblogs
