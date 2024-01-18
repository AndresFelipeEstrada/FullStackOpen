import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: false
    })
    setNewNote('')
  }
  return (
    <div className='formDiv'>
      <h2>Create a new note</h2>

      <div>
        <form onSubmit={addNote}>
          <input id='newNote' value={newNote} onChange={handleNoteChange} />
          <button id='newNoteSubmit' type="submit">save</button>
        </form>
      </div>
    </div>

  )
}

export default NoteForm
