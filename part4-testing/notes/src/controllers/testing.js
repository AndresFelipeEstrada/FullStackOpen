import { Router } from 'express'
import { Note } from '../models/notes.js'
import { User } from '../models/users.js'

const testingRouter = Router()

testingRouter.post('/reset', async (_req, res) => {
  await Note.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})

export default testingRouter
