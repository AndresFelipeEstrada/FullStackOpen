import { Router } from "express"
import { Blog } from "../models/blogs.js"

const blogsRouter = Router()

blogsRouter.get('/', (_, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

export default blogsRouter
