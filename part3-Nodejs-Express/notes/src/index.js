import "dotenv/config.js";
import express from 'express';
import { Note, connectDB } from './models/note.js';

const app = express()
const PORT = process.env.PORT


const requestLogger = (request, _response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, _request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


app.use(express.json())
app.use(requestLogger)
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
app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id).then(note => {
    if (!note) res.status(404).end()

    res.json(note)
  }).catch(error => next(error))
})


// AGREGAR NOTA
app.post('/api/notes', (req, res, next) => {
  const body = req.body

  if (!body.content) return res.status(400).json({ error: "Content missing" })

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
app.put('/api/notes/:id', (req, res, next) => {
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
app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(_result => res.status(204).end())
    .catch(error => next(error))
})



app.use(errorHandler)
app.use(unknownEndpoint)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`)
  connectDB()
})
