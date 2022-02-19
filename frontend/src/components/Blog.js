import React from 'react'

let Blog = ({ blog, handleLike, handleDelete, loggedUser }) => {
  return (
    <article className="post-excerpt">
      <h3>{blog.title}</h3>
      <div>
        <i>by {blog.author}</i>
      </div>
      <div>URL: {blog.url}</div>
      <div>Shared by {blog.user.username}</div>
      <div>Likes: {blog.likes}</div>
      <button onClick={() => handleLike(blog.id)}>Like</button>&nbsp;
      {loggedUser && loggedUser.username === blog.user.username ? (
        <button onClick={() => handleDelete(blog)}>Delete</button>
      ) : null}
    </article>
  )
}

Blog = React.memo(Blog)

export default Blog
