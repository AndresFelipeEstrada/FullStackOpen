const dummy = (blogs) => {
  return 1
}

const totalLikes = (postBlogs) => {
  let total = 0
  postBlogs.forEach(blog => total += blog.likes)
  return total
}

const favoriteBlog = (listBlogs) => {
  const favorite = listBlogs.reduce((maxLikes, blog) => {
    return blog.likes > maxLikes ? blog.likes : maxLikes
  }, listBlogs[0].likes)

  return favorite
}

const mostBlogs = (blogs) => {
  let blogsPorAutor = {}

  blogs.forEach((blog) => {
    let autor = blog.author;

    if (blogsPorAutor[autor]) {
      blogsPorAutor[autor]++;
    } else {
      blogsPorAutor[autor] = 1;
    }
  })

  const masBlogs = Object.keys(blogsPorAutor).reduce((a, b) => {
    return blogsPorAutor[a] > blogsPorAutor[b] ? a : b
  })

  return {
    author: masBlogs,
    blogs: blogsPorAutor[masBlogs]
  }
}
export default { dummy, totalLikes, favoriteBlog, mostBlogs }
