import 'dotenv/config'
import './mongo.js'
import { PORT } from './utils/config.js'
import express from 'express'
import notesRouter from './controllers/notes.js'
import middleware from './utils/middleware.js'
import logger from './utils/logger.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.get('/', (_req, res) => {
  res.status(200).send('test')
})

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`Servidor escuchando en el puerto: ${PORT}`)
  })
}
export default app
