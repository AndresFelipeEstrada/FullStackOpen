import './app.css'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login.js"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('login')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      loginService.setToken(user.token)
    }
  }, [])


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])


  const handleForm = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })
      setUser(loggedUser)
      window.localStorage.setItem('login', JSON.stringify(loggedUser))
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log('error al loguearse:', error.message)
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const listBlogs = () => (
    <>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

  const loginForm = () => (
    <>
      <h1>Log in to application</h1>
      <form onSubmit={handleForm}>
        <label>
          username:
          <input type="text" onChange={({ target }) => setUsername(target.value)} />
        </label>

        <label>
          password:
          <input type="password" onChange={({ target }) => setPassword(target.value)} />
        </label>

        <button>login</button>
      </form>
    </>
  )
  return (
    <div>
      <h2>Blogs</h2>
      <h3>{`Bienvenido ${user.name}`}</h3>
      <button onClick={logout}>Logout</button>

      {user === null ? loginForm() : listBlogs()}

    </div>
  )
}

export default App
