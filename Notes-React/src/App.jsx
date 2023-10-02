import { useEffect, useState } from 'react'
import noteService from './services/axios'
import Note from './componets/Note'
import ErrorNotificacion from './componets/Error'

import './App.css'
import Footer from './componets/Footer'
import Success from './componets/Success'

function App () {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  useEffect(() => {
    try {
      const getData = async () => {
        const data = await noteService.getAll()
        setNotes(data)
      }

      getData()
    } catch (error) {
      setErrorMessage(error.message)
    }
  }, [])

  const addNewNote = async (e) => {
    e.preventDefault()
    const addNote = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }

    const createdNote = await noteService.create(addNote)

    setNotes(notes.concat(createdNote))
    setNewNote('')

    setSuccessMessage('Nota agregada con exito')

    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const handleNewNote = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportance = async (id) => {
    try {
      const findNote = notes.find(note => note.id === id)

      if (!findNote) return console.log('Nota no encontrada')

      const changedNote = {
        ...findNote,
        important: !findNote.important
      }

      const updatedNote = await noteService.update(id, changedNote)

      setNotes(notes.map(note => note.id !== id ? note : updatedNote))
    } catch (error) {
      setErrorMessage(`Note error: ${error.message}`)

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <>
      <div>
        <h1>Notes</h1>
        <ErrorNotificacion message={errorMessage}/>
        <Success message={successMessage}/>

        <div>
          <button onClick={() => setShowAll(!showAll)}>{showAll ? 'Important' : 'All'}</button>
        </div>

        <div>
          <form onSubmit={addNewNote}>
            <input type="text" value={newNote} onChange={handleNewNote} />
            <button>Guardar</button>
          </form>
        </div>

        <ul>
          {notesToShow.map(note => (
            <Note key={`New-Note${note.id}`}
             note={note}
            toggleImportance={() => toggleImportance(note.id)}
             />
          ))}
        </ul>

      </div>

      <Footer/>

    </>
  )
}

export default App
