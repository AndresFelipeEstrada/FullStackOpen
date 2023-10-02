import anecdoteReducer from './anecdoteReducer'
import { configureStore } from '@reduxjs/toolkit'
import notificacionReducer from './notificationReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificacionReducer
  }
})

export default store
