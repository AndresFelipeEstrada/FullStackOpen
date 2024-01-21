import { Router } from 'express'
import { User } from '../models/users.js'
import { Blog } from '../models/blogs.js'

const testingRouter = Router()

testingRouter.post('/reset', async (_req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})

export default testingRouter
