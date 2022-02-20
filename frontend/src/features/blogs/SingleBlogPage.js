import React, { useLayoutEffect } from 'react'
import Blog from './Blog'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBlogs, selectBlogById, deleteBlog } from './blogsSlice'
import { ReactionButtons } from './ReactionButtons'
import BlogComments from './BlogComments'

const SingleBlogPage = () => {
  const { blogId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loggedUser = useSelector((state) => state.users.loggedUser)
  const blogsStatus = useSelector((state) => state.blogs.status)
  useLayoutEffect(() => {
    if (blogsStatus === 'idle') {
      dispatch(fetchBlogs())
    }
  }, [dispatch, blogsStatus])

  const blog = useSelector((state) => selectBlogById(state, blogId))

  if (blogsStatus !== 'fulfilled' || !blog) {
    return (
      <section>
        <h2>Blog not found...</h2>
      </section>
    )
  }
  const handleDelete = async (blog) => {
    const userConfirmation = window.confirm('Deleting ' + blog.title + '?')
    if (!userConfirmation) {
      return
    }
    dispatch(deleteBlog(blog.id))
    navigate('/')
  }
  return (
    <section>
      <h2>{blog.title}</h2>
      <div>
        <i>Author: {blog.author}</i>
      </div>
      <div>
        <span>URL:&nbsp;</span>
        <a href={blog.url} target="_blank">
          {blog.url}
        </a>
      </div>
      <div>Shared by {blog.user.username}</div>
      <ReactionButtons blog={blog} />
      {loggedUser && loggedUser.username === blog.user.username ? (
        <button onClick={() => handleDelete(blog)}>Delete</button>
      ) : null}
      <BlogComments blogId={blogId} />
    </section>
  )
}

export default SingleBlogPage
