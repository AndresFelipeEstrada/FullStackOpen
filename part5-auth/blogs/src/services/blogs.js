import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/blogs'
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

const updateBlog = async (id) => {
  const response = await axios.patch(`${baseUrl}/${id}`, {}, {
    headers: { Authorization: token }
  })
  return response.data
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: token }
  })
  return response.data
}

export default { getAll, createBlog, setToken, updateBlog, deleteBlog }
