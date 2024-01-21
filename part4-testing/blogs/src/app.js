import config from './utils/config.js'
import { connect } from 'mongoose'
import express from 'express'
import cors from 'cors'
import blogsRouter from './controller/blogs.js'
import usersRouter from './controller/users.js'
import middlewares from './utils/middlewares.js'
import loginRouter from './controller/login.js'
import testingRouter from './controller/testing.js'

const app = express()

connect(config.URL).then(() => {
  console.log('connected to MongoDB')
}).catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())
app.use(middlewares.requestLogger)
app.use(middlewares.getTokenFrom)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'development') {
  app.use('/api/testing', testingRouter)
}

app.use(middlewares.errorHandler)
app.use(middlewares.unknownEndpoint)

export default app
