import express from 'express'
import data from './data.js'

const app = express()
app.use(express.json())

const PORT = 3001


app.get('/api/persons', (_, res) => {
  res.json(data)
})

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params

  const getUser = data.find(user => user.id === Number(id))

  if (!getUser) return res.status(402).json({ error: 'User Not Found' })


  return res.status(200).json({ user: getUser })
})


app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const deletedUser = data.filter(user => user.id !== id)

  if (!deletedUser) return res.json({ error: 'deleted user error' })


  return res.json(deletedUser)
})

const getId = () => {
  let generateId = data.length > 0 ? Math.max(...data.map(user => user.id)) : 0
  return generateId + 1
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (data.some(user => user.name === body.name)) {
    return res.json({ error: "name must be unique" })
  }

  const createUser = {
    id: getId(),
    name: body.name,
    number: body.number
  }

  data.push(createUser)
  return res.json(data)
})

app.get('/info', (_req, res) => {
  const date = new Date()
  res.send(`<h2>Phonebook has info for ${data.length} people </h2><br><h1>${date}</h1>`)
})

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto: ${PORT}`)
})
