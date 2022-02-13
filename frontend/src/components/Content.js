import React, { useState, useEffect } from 'react'
import CreateNew from './CreateNew'
import Showblogs from './Showblogs'
import blogService from '../services/blogs'

const Content = (props) => {
  const [blogs, setBlogs] = useState([])

  const setBlogsSorted = (blogs) => {
    setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogsSorted( blogs )
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
      setBlogsSorted(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    } catch (error) {
      props.handleNotification('There was an error liking the blog', 'Error')
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
        setBlogs(blogs.filter(blog => blog.id !== id))
      } else {
        throw new Error()
      }
    } catch (error) {
      props.handleNotification('There was an error Deleting the blog', 'Error')
    }
  }

  const createNewProps = { blogs, setBlogs, handleNotification: props.handleNotification }
  const showblogsProps = { blogs, handleLike, handleDelete, user: props.user }

  return (
    <div>
      <CreateNew {...createNewProps}/>
      <Showblogs {...showblogsProps}/>
    </div>

  )
}

export default Content
