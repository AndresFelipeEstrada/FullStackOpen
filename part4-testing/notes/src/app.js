import 'dotenv/config'
import express from 'express'
import notesRouter from './controllers/notes.js'
import cors from 'cors'
import { PORT } from './utils/config.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/notes', notesRouter)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`)
})

export default app
