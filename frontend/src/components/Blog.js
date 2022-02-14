import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, loggedUser }) => {
  const [showInfo, setShowInfo] = useState(false)
  const [buttonText, setButtonText] = useState('View')

  const toggleShowInfo = () => {
    setButtonText(showInfo ? 'View' : 'Hide')
    setShowInfo(!showInfo)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteButton = () => {
    if (loggedUser.username !== blog.user.username) {
      return null
    }

    return (
      <div>
        <button onClick={() => handleDelete(blog)}>
          Delete
        </button>
      </div>
    )
  }

  const blogInfo = () => (
    <div className="blog-info">
      <div>URL: {blog.url}</div>
      <div>
        Likes: {blog.likes}&nbsp;
        <button
          className="button-like"
          onClick={() => handleLike(blog.id)}
        >
          Like
        </button>
      </div>
      <div>Shared by {blog.user.username}</div>
      {deleteButton()}
    </div>
  )

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} by {blog.author}
        &ensp;
        <button
          className="button-view"
          onClick={toggleShowInfo}
        >
          {buttonText}
        </button>
      </div>
      {showInfo ? blogInfo() : null}
    </div>
  )
}

export default Blog