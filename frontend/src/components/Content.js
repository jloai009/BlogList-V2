import React, { useEffect } from 'react'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs, selectBlogIds } from '../features/blogs/blogsSlice'

const Content = () => {
  const dispatch = useDispatch()
  const blogsStatus = useSelector((state) => state.blogs.status)
  const blogIds = useSelector(selectBlogIds)

  useEffect(() => {
    if (blogsStatus === 'idle') {
      dispatch(fetchBlogs())
    }
  }, [blogsStatus, dispatch])

  return (
    <section>
      <div className="posts-list">
        <h2>Blogs</h2>
        {blogIds.map((blogId) => (
          <Blog key={blogId} blogId={blogId} />
        ))}
      </div>
    </section>
  )
}

export default Content
