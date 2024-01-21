import './login.css'
import PropTypes from 'prop-types'
import { useState } from 'react'

const Login = ({ handleSubmit }) => {
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
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <label className="login-input">
          username:
          <input
            type="text"
            name="username"
            id="username"
            value={login.username}
            onChange={handleOnChange} />
        </label>

        <label className="login-input">
          password:
          <input
            type="password"
            name="password"
            id="password"
            value={login.password}
            onChange={handleOnChange} />
        </label>

        <button id='login-submit' type="submit">Login</button>
      </form>
    </div>
  )
}

Login.prototypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default Login
