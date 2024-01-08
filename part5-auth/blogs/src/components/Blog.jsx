import { useState } from 'react'
import blogService from "../services/blogs.js"
import './blog.css'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [showDetail, setShowDetail] = useState(false)

  const changeVisibility = () => setShowDetail(!showDetail)

  return (
    <div className='blog'>
      <div>
        {blog.title}  <button onClick={changeVisibility}>{showDetail ? 'Hide' : "View"}</button>
      </div>

      {showDetail && (
        <div>
          <p>{blog.url}</p>
          <div style={{ display: 'flex' }}>
            <p> <strong>Likes:</strong> {blog.likes}</p>
            <button onClick={() => updateLikes(blog.id)} style={{ height: '25px', display: 'block', marginTop: '10px', marginLeft: '10px' }}>+</button>
          </div>
          <strong>{blog.author}</strong>
          <button className='remove-button' onClick={() => deleteBlog(blog.id)}>Remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog
