import { useState } from 'react'
import PropTypes from 'prop-types'
import './blog.css'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [showDetail, setShowDetail] = useState(false)

  const changeVisibility = () => setShowDetail(!showDetail)
  return (
    <div className='blog'>
      <div>
        {blog.title} <strong>{blog.author}</strong>
        <button onClick={changeVisibility}>{showDetail ? 'Hide' : 'View'}</button>
      </div>

      {showDetail && (
        <div className='hidden-content'>
          <p>{blog.url}</p>
          <div style={{ display: 'flex' }}>
            <p> <strong>Likes:</strong> {blog.likes}</p>
            <button onClick={() => updateLikes(blog.id)} className='like-button' id='like-button'>Like</button>
          </div>
          <button id='delete-button' className='remove-button' onClick={() => deleteBlog(blog.id, blog.user.username)}>Remove</button>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
