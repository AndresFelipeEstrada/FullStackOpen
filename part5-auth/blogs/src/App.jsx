import './app.css'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login.js"
import Notification from './components/Notification.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('login')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleMessage = (message, type) => {
    setMessage({ message, type })
    setTimeout(() => {
      setMessage(null)
    }, 3000);
  }

  const handleForm = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
      window.localStorage.setItem('login', JSON.stringify(loggedUser))
      setUsername('')
      setPassword('')
    } catch (error) {
      handleMessage('wrong username or password', 'error')
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }

    try {
      const createdBlog = await blogService.createBlog(blog)
      blogService.setToken(user.token)
      setBlogs(blogs.concat(createdBlog))
      handleMessage('Successfully created blog ', 'success')
    } catch (error) {
      handleMessage(`a new blog you're NOT gonna need it! by ${blog.author}`, 'error')
    }

    setNewBlog({
      title: '',
      author: '',
      url: '',
      likes: 0
    })
  }

  const handleNewBlog = (event) => {
    const { name, value } = event.target
    setNewBlog(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const listBlogs = () => (
    <>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <label htmlFor="title"><strong>Title:</strong>
          <input type="text" id='title' name='title'
            value={newBlog.title}
            onChange={handleNewBlog}
          />
        </label>
        <label htmlFor="author"><strong>Author:</strong>
          <input type="text" id='author' name='author'
            value={newBlog.author}
            onChange={handleNewBlog}
          />
        </label>
        <label htmlFor="url"><strong>Url:</strong>
          <input type="text" id='url' name='url'
            value={newBlog.url}
            onChange={handleNewBlog}
          />
        </label>

        <button>Create</button>
      </form>

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

        <button>Login</button>
      </form>
    </>
  )
  return (
    <div>
      <h2>Blogs</h2>
      <h3>{`Bienvenido ${user?.name}`}</h3>
      <button onClick={logout}>Logout</button>
      <Notification message={message} />
      {user === null ? loginForm() : listBlogs()}

    </div>
  )
}

export default App
