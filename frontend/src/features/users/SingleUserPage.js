import React, { useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { selectUserById, fetchUsers } from './usersSlice'

const SingleUserPage = () => {
  const dispatch = useDispatch()
  const usersStatus = useSelector((state) => state.users.status)
  useLayoutEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers())
    }
  }, [dispatch, usersStatus])

  const { userId } = useParams()
  const user = useSelector((state) => selectUserById(state, userId))
  console.log(user)

  if (usersStatus !== 'fulfilled' || !user) {
    return (
      <section>
        <h2>User not found...</h2>
      </section>
    )
  }

  return (
    <section>
      <h2>{user.username}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li>
            <a href={blog.url} target="_blank">
              {blog.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SingleUserPage
