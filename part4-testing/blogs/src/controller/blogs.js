import { Router } from "express"
import { Blog } from "../models/blogs.js"

const blogsRouter = Router()

blogsRouter.get('/', async (_, res) => {
  try {
    const allBlogs = await Blog.find({})

    if (!allBlogs) return res.status(400)

    return res.status(200).json(allBlogs).end()

  } catch (error) {
    console.log(error.message)
  }
})


blogsRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.title || !body.author || !body.url || !body.likes) {
    return res.status(400).json({ error: "faltan datos" })
  }
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  try {
    const saveBlog = await newBlog.save()
    res.status(201).json(saveBlog).end()
  } catch (error) {
    console.log(error.message)
  }
})

export default blogsRouter
