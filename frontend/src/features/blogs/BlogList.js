import React, { useEffect } from 'react'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs, selectBlogIds } from './blogsSlice'
import { Spinner } from '../../components/Spinner'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogsStatus = useSelector((state) => state.blogs.status)
  const blogIds = useSelector(selectBlogIds)

  useEffect(() => {
    if (blogsStatus === 'idle') {
      dispatch(fetchBlogs())
    }
  }, [blogsStatus, dispatch])

  let content

  if (blogsStatus === 'fulfilled') {
    content = blogIds.map((blogId) => <Blog key={blogId} blogId={blogId} />)
  } else {
    content = <Spinner text="Loading..." />
  }

  return (
    <section>
      <div className="posts-list">
        <h2>Blogs</h2>
        {content}
      </div>
    </section>
  )
}

export default BlogList
