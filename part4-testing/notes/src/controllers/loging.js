import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Router } from 'express'
import { User } from '../models/users.js'

const loginRouter = Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  if (!user) {
    return res.status(401).json({ error: 'invalid username or password' })
  }
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)

  if (!passwordCorrect) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })

  res.status(200).send({ token, username: user.username, name: user.name })
})

export default loginRouter
