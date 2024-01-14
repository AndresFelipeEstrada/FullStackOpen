import './app.css'
import { useState, useEffect } from 'react'
import Login from './components/Login.jsx'
import Notification from './components/Notification.jsx'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog.jsx'
import Togglable from './components/Togglable.jsx'
import blogService from './services/blogs'
import loginService from './services/login.js'

const App = () => {
  const [blogs, setBlogs] = useState([])
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
    }, 3000)
  }

  const handleSubmit = async (loginObject) => {
    try {
      const loggedUser = await loginService.login(loginObject)
      window.localStorage.setItem('login', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
    } catch (error) {
      handleMessage('wrong username or password', 'error')
    }
  }

  const addBlog = async (newBlogObject) => {
    try {
      const createdBlog = await blogService.createBlog(newBlogObject)
      blogService.setToken(user.token)
      setBlogs(blogs.concat(createdBlog))
      handleMessage('Successfully created blog ', 'success')
    } catch (error) {
      handleMessage(`a new blog you're NOT gonna need it! by ${newBlogObject.author}`, 'error')
    }
  }

  const updateLikes = async (id) => {
    try {
      const updatedBlog = await blogService.updateBlog(id)
      setBlogs(blogs.map((blog) => blog.id !== id ? blog : updatedBlog))
    } catch (error) {
      console.log('error al actualizar likes', error.message)
    }
  }

  const deleteBlog = async (id, username) => {
    if (user.username !== username) {
      return handleMessage('No tienes permisos para eliminar este blog', 'error')
    }

    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter((blog) => blog.id === id ? null : blog))
      handleMessage('Blog borrado con exito', 'success')
    } catch (error) {
      handleMessage('Eror al intentar borrar un blog', 'error')
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const newBlogs = () => (
    <>
      <button onClick={logout}>Logout</button>
      <h3>{`Bienvenido ${user?.name}`}</h3>
      <Togglable label="New Blog">
        <NewBlog createBlog={addBlog} />
      </Togglable>

    </>
  )

  const loginForm = () => (
    <Togglable label="Login">
      <Login handleSubmit={handleSubmit} />
    </Togglable>
  )

  const blogsSorted = blogs.sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} />
      {user === null ? loginForm() : newBlogs()}

      {blogsSorted.map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App
