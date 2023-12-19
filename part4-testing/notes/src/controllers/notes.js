import { Router } from 'express'
import { Note } from '../models/notes.js'
import { User } from '../models/users.js'
import jwt from 'jsonwebtoken'

const notesRouter = Router()

const getTokenFrom = (req) => {
  const authorization = req.get('authorization')

  if (!authorization && !authorization.toLowerCase().startsWith('bearer')) return null

  return authorization.substring(7)
}

// TODAS LAS NOTAS
notesRouter.get('/', async (_req, res) => {
  try {
    const allNotes = await Note.find({}).populate('user', { username: 1, name: 1 })

    if (!allNotes) return res.status(400)

    return res.status(200).json(allNotes).end()
  } catch (error) {
    console.log(error)
  }
})

// BUSCAR UNA NOTA
notesRouter.get('/:id', async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id)
    if (!note) return res.status(404).end()

    res.status(200).json(note)
  } catch (error) {
    next(error)
  }
})

// AGREGAR NOTA
notesRouter.post('/', async (req, res, next) => {
  const { content, important } = req.body

  if (!content) return res.status(400).json({ error: 'Content missing' })

  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content,
    important: important || false,
    date: new Date(),
    user: user._id
  })

  try {
    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    res.status(201).json(savedNote).end()
  } catch (error) {
    next(error)
  }
})

// ACTUALIZAR NOTA
notesRouter.put('/:id', async (req, res, next) => {
  const { content, important } = req.body
  const note = {
    content,
    important
  }

  try {
    const result = await Note.findByIdAndUpdate(req.params.id, note, { new: true })
    res.json(result).end()
  } catch (error) {
    next(error)
  }
})

// BORRAR NOTA
notesRouter.delete('/:id', async (req, res, next) => {
  try {
    const deletedNote = await Note.findByIdAndRemove(req.params.id)
    res.status(204).json({ deleteNote: deletedNote }).end()
  } catch (error) {
    next(error)
  }
})

export default notesRouter
