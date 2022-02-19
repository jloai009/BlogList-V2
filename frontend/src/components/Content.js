import React, { useEffect } from 'react'
import Showblogs from './Showblogs'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteBlog,
  fetchBlogs,
  selectAllBlogs,
  selectBlogById,
  selectBlogIds,
} from '../features/blogs/blogsSlice'

const Content = () => {
  const dispatch = useDispatch()
  const blogsStatus = useSelector((state) => state.blogs.status)

  useEffect(() => {
    if (blogsStatus === 'idle') {
      dispatch(fetchBlogs())
    }
  }, [blogsStatus, dispatch])

  const blogs = useSelector(selectAllBlogs)

  const handleDelete = async (blog) => {
    const userConfirmation = window.confirm('Deleting ' + blog.title + '?')
    if (!userConfirmation) {
      return
    }
    dispatch(deleteBlog(blog.id))
  }

  const showblogsProps = { blogs, handleDelete }

  return (
    <section>
      <Showblogs {...showblogsProps} />
    </section>
  )
}

export default Content
