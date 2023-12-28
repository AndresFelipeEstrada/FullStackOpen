import { User } from '../models/users.js'
import jwt from 'jsonwebtoken'
import logger from '../utils/logger.js'

const requestLogger = (request, _response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message)

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

const getTokenFrom = (req, _, next) => {
  const authorization = req.get('authorization')
  if (!authorization || !authorization.toLowerCase().startsWith('bearer')) {
    return next()
  }
  req.token = authorization.substring(7)
  next()
}

const userExtrator = async (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: 'No se proporciono ningun token' })
  }

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'Token erroneo' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) return res.json({ error: 'Usuario no encontrado' })

    req.user = user
    next()
  } catch (error) {
    console.log(error.message)
    return res.json({
      error: 'Error en el middleware userExtrator '
    })
  }
}

export default { requestLogger, errorHandler, unknownEndpoint, getTokenFrom, userExtrator }
