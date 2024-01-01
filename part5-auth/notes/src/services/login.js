import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const login = async (object) => {
  const response = await axios.post(baseUrl, object)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }

