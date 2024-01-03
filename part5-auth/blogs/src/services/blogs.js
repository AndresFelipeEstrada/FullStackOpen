import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'
let token

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, {
    headers: { Authorization: token }
  })
  return response.data
}

export default { getAll, createBlog, setToken }
