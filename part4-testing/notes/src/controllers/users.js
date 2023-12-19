import { Router } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/users.js'

const usersRouter = Router()

usersRouter.get('/', async (_, res) => {
  const allUsers = await User.find({}).populate('notes', { content: 1, date: 1 })
  res.status(200).json(allUsers)
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    password: passwordHash
  })

  const savedUser = await user.save()

  res.status(200).json(savedUser)
})

export default usersRouter
