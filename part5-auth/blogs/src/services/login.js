import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const login = async (Object) => {
  const response = await axios.post(baseUrl, Object)
  return response.data
}

export default { login }
