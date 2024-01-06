import { useState } from "react"

const Login = ({ handleSubmit }) => {

  const [login, setLogin] = useState({
    username: '',
    password: ''
  })

  const handleOnChange = (event) => {
    const { name, value } = event.target

    setLogin(prev => ({
      ...prev,
      [name]: value,
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
        <label>
          username:
          <input
            type="text"
            name="username"
            value={login.username}
            onChange={handleOnChange} />
        </label>

        <label>
          password:
          <input
            type="password"
            name="password"
            value={login.password}
            onChange={handleOnChange} />
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
