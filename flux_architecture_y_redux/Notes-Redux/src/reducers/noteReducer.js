import { createSlice } from '@reduxjs/toolkit'
import notesService from '../services/notes.js'

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action) {
      const { id } = action.payload
      const noteToChange = state.find((note) => note.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map((note) => note.id !== id ? note : changedNote)
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(_state, action) {
      return action.payload
    }
  }
})

export const { toggleImportanceOf, appendNote, setNotes } = notesSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await notesService.getNotes()
    dispatch(setNotes(notes))
  }
}

export const createNote = (content) => {
  return async dispatch => {
    const newNote = await notesService.postNewNote(content)
    dispatch(appendNote(newNote))
  }
}
export default notesSlice.reducer
