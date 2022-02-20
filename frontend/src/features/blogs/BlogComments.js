import React, { useState } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { addComment } from './blogsSlice'

let BlogComments = ({ blogId }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const blogComments = useSelector(
    (state) => state.blogs.entities[blogId].comments,
    shallowEqual
  )

  const handleAddComment = () => {
    dispatch(addComment({ blogId, comment }))
    setComment('')
  }

  return (
    <div>
      <h3>Comment</h3>
      <form>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
        ></input>
        <button type="button" onClick={handleAddComment}>
          Add Comment
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Previous Comments:</th>
          </tr>
        </thead>
        <tbody>
          {blogComments.map((comment) => (
            <tr key={nanoid()}>
              <td>{comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

BlogComments = React.memo(BlogComments)

export default BlogComments
