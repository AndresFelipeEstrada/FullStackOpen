import { Router } from 'express'
import { Note } from '../models/notes.js'

const notesRouter = Router()

// TODAS LAS NOTAS
notesRouter.get('/', async (_req, res) => {
  try {
    const allNotes = await Note.find({})

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
    console.log('entra aqui?')
    next(error)
  }
})

// AGREGAR NOTA
notesRouter.post('/', async (req, res, next) => {
  const { content, important } = req.body

  if (!content) return res.status(400).json({ error: 'Content missing' })

  const note = new Note({
    content,
    important: important || false,
    date: new Date()
  })

  try {
    const savedNote = await note.save()
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
