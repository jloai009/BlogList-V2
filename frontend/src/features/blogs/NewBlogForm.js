import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setNotification } from '../notification/notificationSlice'
import { addNewBlog } from './blogsSlice'

const NewBlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [hideForm, setHideForm] = useState(true)

  const dispatch = useDispatch()

  const handleCreateNew = async () => {
    let blogUrl = url
    if (
      blogUrl.substring(0, 7) !== 'http://' &&
      blogUrl.substring(0, 8) !== 'https://'
    ) {
      blogUrl = 'http://' + blogUrl
    }

    if (blogUrl === 'http://') {
      blogUrl = ''
    }

    const blogObject = {
      title: title,
      author: author,
      url: blogUrl,
      reactions: {
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    }

    const response = await dispatch(addNewBlog(blogObject)).unwrap()
    if (response.status !== 400) {
      dispatch(setNotification('Blog Created'))
      setHideForm(true)
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  const changeVisibility = () => {
    setHideForm(!hideForm)
  }

  if (hideForm) {
    return (
      <section>
        <button onClick={changeVisibility}>Add New Coding Course</button>
      </section>
    )
  }

  return (
    <section>
      <h2>Add New Coding Course</h2>
      <form>
        <div>
          <label htmlFor="input-title">Title:</label>
          <input
            id="input-title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => {
              setTitle(target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="input-author">Author:</label>
          <input
            id="input-author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => {
              setAuthor(target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="input-url">URL:</label>
          <input
            id="input-url"
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => {
              setUrl(target.value)
            }}
          />
        </div>
        <div>
          <button id="button-create" type="button" onClick={handleCreateNew}>
            Create
          </button>
          &nbsp;
          <button type="button" onClick={changeVisibility}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}

export default NewBlogForm
