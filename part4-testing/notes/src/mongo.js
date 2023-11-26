import { CONNECTION_STRING } from './utils/config.js'
import mongoose from 'mongoose'
import logger from './utils/logger.js'

mongoose.connect(CONNECTION_STRING)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })
