import config from './utils/config.js'
import express from 'express'
import notesRouter from './controllers/notes.js'
import middleware from './utils/middleware.js'
import logger from './utils/logger.js'
import mongoose from 'mongoose'

const app = express()

mongoose.connect(config.URL).then(_result => {
  logger.info('Connect to Database')
}).catch(error => {
  logger.error('error connecting to mongoDB', error.message)
})

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

export default app
