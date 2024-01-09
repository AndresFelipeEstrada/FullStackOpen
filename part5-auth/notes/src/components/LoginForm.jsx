import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit }) => {
  const [login, setLogin] = useState({
    username: '',
    password: ''
  })

  const handleOnChange = (event) => {
    const { name, value } = event.target
    setLogin(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = (event) => {
    event.preventDefault()
    handleSubmit(login)
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={login.username}
          name="username"
          onChange={handleOnChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={login.password}
          name="password"
          onChange={handleOnChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

LoginForm.prototype = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm
