import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog } from '../features/blogs/blogsSlice'

const Blog = ({ blog, handleDelete, loggedUser }) => {
  const dispatch = useDispatch()

  return (
    <article className="post-excerpt">
      <h3>{blog.title}</h3>
      <div>
        <i>by {blog.author}</i>
      </div>
      <div>URL: {blog.url}</div>
      <div>Shared by {blog.user.username}</div>
      <div>Likes: {blog.likes}</div>
      <button onClick={() => dispatch(likeBlog(blog.id))}>Like</button>&nbsp;
      {loggedUser && loggedUser.username === blog.user.username ? (
        <button onClick={() => handleDelete(blog)}>Delete</button>
      ) : null}
    </article>
  )
}

export default Blog
