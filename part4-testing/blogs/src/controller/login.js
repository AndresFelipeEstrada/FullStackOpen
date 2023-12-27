import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { Router } from "express";
import { User } from "../models/users.js";

const loginRouter = Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) return res.status(400).json({ error: 'Faltan datos' })

  const user = await User.findOne({ username })

  if (!user) return res.status(401).json({ error: "Credenciales incorrectas" })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)

  if (!passwordCorrect) return res.status(401).json({ error: "Credenciales incorrectas" })

  const userToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userToken, process.env.SECRET, { expiresIn: 60 * 60 })
  res.status(200).json({ token, username: user.username, name: user.name })
})

export default loginRouter
