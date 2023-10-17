import "dotenv/config.js";
import express from 'express'
import { Note, connectDB } from './models/note.js'

const app = express()
app.use(express.json())
const PORT = process.env.PORT


// TODAS LAS NOTAS
app.get('/api/notes', async (_req, res) => {
  try {
    const allNotes = await Note.find({})
    res.json(allNotes)
  } catch (error) {
    console.log(error)
  }
})

// BUSCAR UNA NOTA
app.get('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id).then(note => {
    res.json(note)
  })
})

// AGREGAR NOTA
app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content) return res.status(400).json({ error: "Content missing" })

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  note.save().then(result => {
    res.json(result)
  })
})

// BORRAR NOTA
// app.delete('/api/notes/:id', (req, res) => {
//   const { id } = req.params
//   const deleteNote = notes.filter((note) => note.id !== Number(id))
//
//   if (!deleteNote) return res.status(400).json({ message: 'Note not found' })
//
//   res.status(204).json({ message: 'note delete', note: deleteNote })
// })


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`)
  connectDB()
})
