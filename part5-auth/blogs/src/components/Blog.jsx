const Blog = ({ blog }) => {
  return (
    <div>
      {blog.title} by <strong>{blog.author}</strong>
    </div>
  )
}

export default Blog
