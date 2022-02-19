import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  likeBlog,
  deleteBlog,
  selectBlogById,
} from '../features/blogs/blogsSlice'

const Blog = ({ blogId }) => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.users.loggedUser)
  const blog = useSelector((state) => selectBlogById(state, blogId))
  const handleDelete = async (blog) => {
    const userConfirmation = window.confirm('Deleting ' + blog.title + '?')
    if (!userConfirmation) {
      return
    }
    dispatch(deleteBlog(blog.id))
  }

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
