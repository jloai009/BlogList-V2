import React, { useState, useEffect } from 'react'
import CreateNew from './CreateNew'
import Showblogs from './Showblogs'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'

import { setErrorNotification } from '../features/notification/notificationSlice'
import { setBlogs } from '../features/blogs/blogsSlice'

const Content = () => {

  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(setBlogs(blogs))
    )
  }, [])

  const handleLike = async (id) => {
    const blog = blogs.find(b => b.id === id)

    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    try {
      const returnedBlog = await blogService.put(id, likedBlog)
      dispatch(setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog)))
    } catch (error) {
      dispatch(setErrorNotification('There was an error liking the blog'))
    }
  }

  const handleDelete = async (blog) => {

    const userConfirmation = window.confirm('Deleting ' + blog.title + '?')
    if (!userConfirmation) {
      return
    }

    const id = blog.id

    try {
      const response = await blogService._delete(id)
      if (response.status === 204) {
        dispatch(setBlogs(blogs.filter(blog => blog.id !== id)))
      } else {
        throw new Error()
      }
    } catch (error) {
      dispatch(setErrorNotification('There was an error Deleting the blog'))
    }
  }

  const showblogsProps = { blogs, handleLike, handleDelete }

  return (
    <div>
      <CreateNew />
      <Showblogs {...showblogsProps} />
    </div>

  )
}

export default Content
