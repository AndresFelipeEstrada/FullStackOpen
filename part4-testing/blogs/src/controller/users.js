import { Router } from "express";
import { User } from "../models/users.js";
import bcrypt from "bcrypt"

const usersRouter = Router()

usersRouter.get('/', async (_, res) => {
  const allUsers = await User.find({}, '-password').populate('blogs', { tittle: 1, author: 1, url: 1, likes: 1 })
  res.status(200).json(allUsers)
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.username || !body.password) return res.status(400).json({ error: 'Faltan datos' })

  if (body.password.length < 3) return res.status(400).json({ error: 'Password muy corta' })

  const userFound = await User.findOne({ username: body.username })

  if (userFound) return res.status(400).json({ error: 'El usuario ya existe' })

  const passwordHash = await bcrypt.hash(body.password, 10)

  const newUser = new User({
    username: body.username,
    password: passwordHash,
    name: body.name
  })

  try {
    const savedUser = await newUser.save()
    res.status(200).json(savedUser).end()
  } catch (error) {
    console.log(error.message)
  }
})

export default usersRouter
