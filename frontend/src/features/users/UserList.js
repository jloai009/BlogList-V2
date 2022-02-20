import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers, selectAllUsers } from './usersSlice'
import { Spinner } from '../../components/Spinner'
import { Link } from 'react-router-dom'

const UsersList = () => {
  const dispatch = useDispatch()
  const usersStatus = useSelector((state) => state.users.status)
  const users = useSelector(selectAllUsers)
  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers())
    }
  }, [dispatch, usersStatus])
  let content
  if (usersStatus === 'fulfilled') {
    content = (
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>
                <Link to={'/users/' + user.id}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  } else {
    content = <Spinner text={'Loading...'} />
  }
  return (
    <section>
      <h2>Users</h2>
      {content}
    </section>
  )
}

export default UsersList
