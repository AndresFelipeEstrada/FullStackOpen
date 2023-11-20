import { Router } from 'express'
import { Note } from '../models/note.js'

const notesRouter = Router()

// TODAS LAS NOTAS
notesRouter.get('/', async (_req, res) => {
  try {
    const allNotes = await Note.find({})
    res.json(allNotes)
  } catch (error) {
    console.log(error)
  }
})

// BUSCAR UNA NOTA
notesRouter.get('/:id', (req, res, next) => {
  Note.findById(req.params.id).then(note => {
    if (!note) res.status(404).end()

    res.json(note)
  }).catch(error => next(error))
})

// AGREGAR NOTA
notesRouter.post('/', (req, res, next) => {
  const body = req.body

  if (!body.content) return res.status(400).json({ error: 'Content missing' })

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  note.save()
    .then(result => res.json(result))
    .catch(error => next(error))
})

// ACTUALIZAR NOTA
notesRouter.put('/:id', (req, res, next) => {
  const { content, important } = req.body

  const note = {
    content,
    important
  }
  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then(result => res.json(result))
    .catch(error => next(error))
})

// BORRAR NOTA
notesRouter.delete('/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(_result => res.status(204).end())
    .catch(error => next(error))
})

export default notesRouter
