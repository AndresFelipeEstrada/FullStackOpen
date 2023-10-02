import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './noteReducer.js'
import { filterReducer } from './filterReducer.js'

const store = configureStore({
  reducer: {
    notes: notesReducer,
    filter: filterReducer
  }
})

export default store
