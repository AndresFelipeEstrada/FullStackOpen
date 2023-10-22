import 'dotenv/config.js'
import express from 'express'
import morgan from 'morgan'
import { Phone } from './mongo.js'

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(morgan('dev'))

const errorHandler = (error, _request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
// ALL USERS
app.get('/api/persons', (_, res, next) => {
  Phone.find({})
    .then(result => res.json(result))
    .catch(error => next(error))
})

// GET ONE USER
app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  Phone.findById(id)
    .then(result => res.json(result))
    .catch(error => next(error))
})

// DELETE USER
app.delete('/api/persons/:id', (req, res, next) => {
  Phone.findByIdAndDelete(req.params.id)
    .then(result => res.status(204).json(result).end())
    .catch(error => next(error))
})

// CREATE NEW USER
app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if (!body.name) return res.json({ error: 'no name' })

  const newPhone = new Phone({
    name: body.name,
    number: body.number
  })

  newPhone.save()
    .then(result => res.json(result))
    .catch(error => next(error))
})

// UPDATE USER
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const id = req.params.id

  if (!body) {
    res.json({ error: 'not body' })
  }

  Phone.findByIdAndUpdate(id, body, { new: true })
    .then(result => res.json(result))
    .catch(error => next(error))
})

app.get('/info', (_req, res) => {
  const date = new Date()
  Phone.find({}).then(result => {
    res.send(`<h2>Phonebook has info for ${result.length} people </h2><br><h1>${date}</h1>`)
  })
})

app.use(errorHandler)
app.use(unknownEndpoint)

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto: ${PORT}`)
})
