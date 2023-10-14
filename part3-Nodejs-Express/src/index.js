import express from 'express'
import crypto from 'crypto'

const app = express()
app.use(express.json())
const PORT = 3001

const notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]

app.get('/api/notes', (_req, res) => {
  res.json({ notes })
})


app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(n => n.id === id)
  if (!note) return res.status(400).json({ message: 'note not found' })

  res.json(note)
})

const generarId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0
  return maxId + 1
}
// AGREGAR NOTA
app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content) return res.json({ error: "Falta content" })

  const newNote = {
    id: generarId(),
    date: `${new Date}`,
    ...body
  }
  notes.push(newNote)

  res.json({ newNote })
})

// BORRAR NOTA
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params
  const deleteNote = notes.filter((note) => note.id !== Number(id))

  if (!deleteNote) return res.status(400).json({ message: 'Note not found' })

  res.status(204).json({ message: 'note delete', note: deleteNote })
})


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`)
})
