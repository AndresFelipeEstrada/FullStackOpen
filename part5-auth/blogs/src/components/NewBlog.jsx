import { useState } from 'react'
import PropTypes from 'prop-types'
const NewBlog = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0
  })

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })
    setNewBlog({
      title: '',
      author: '',
      url: '',
      likes: 0
    })
  }
  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <label htmlFor="title"><strong>Title:</strong>
          <input type="text" id='title' name='title'
            value={newBlog.title}
            onChange={handleBlogChange}
          />
        </label>
        <label htmlFor="author"><strong>Author:</strong>
          <input type="text" id='author' name='author'
            value={newBlog.author}
            onChange={handleBlogChange}
          />
        </label>
        <label htmlFor="url"><strong>Url:</strong>
          <input type="text" id='url' name='url'
            value={newBlog.url}
            onChange={handleBlogChange}
          />
        </label>

        <button type="submit">Create</button>
      </form>

    </div>
  )
}

NewBlog.prototypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlog
