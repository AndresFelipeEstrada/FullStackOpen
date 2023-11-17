import config from './utils/config.js'
import app from './app.js'
import http from 'node:http'
import logger from './utils/logger.js'

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Servidor escuchando en el puerto: ${config.PORT}`)
})
