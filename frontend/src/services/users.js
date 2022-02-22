import axios from 'axios'
const baseUrl = '/api/users'

const fetchUsers = async () => {
  const response = await axios.get(baseUrl)
  return response
}

const signUpUser = async (user) => {
  const response = await axios.post(baseUrl, user)
  return response
}

// eslint-disable-next-line
export default { fetchUsers, signUpUser }
