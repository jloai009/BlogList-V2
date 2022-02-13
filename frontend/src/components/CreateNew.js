import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateNew = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [hideForm, setHideForm] = useState(true)

  const handleCreateNew = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    const response = await blogService.create(blogObject)
    if (response.status === 201) {
      props.setBlogs(props.blogs.concat(response.data))
      props.handleNotification('Blog Created')
      setHideForm(true)
      setTitle('')
      setAuthor('')
      setUrl('')
    } else {
      props.handleNotification(response.message, 'Error')
    }
  }

  const changeVisPrevDef = (event) => {
    event.preventDefault()
    setHideForm(!hideForm)
  }

  if (hideForm) {
    return (
      <div>
        <button onClick={changeVisPrevDef}>
          Create New Blog
        </button>
      </div>
    )
  }

  return (
    <div>
      <h3>Create New</h3>
      <form onSubmit={handleCreateNew}>
        <div>
          <label>Title:</label>
          <input
            id="input-title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => { setTitle(target.value) }}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            id="input-author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => { setAuthor(target.value) }}
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            id="input-url"
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => { setUrl(target.value) }}
          />
        </div>
        <div>
          <button
            id="button-create"
            type="submit"
          >
            Create
          </button>
          <button onClick={changeVisPrevDef}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default CreateNew
