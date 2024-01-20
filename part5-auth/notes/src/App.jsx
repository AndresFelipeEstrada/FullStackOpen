import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login.js'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  // TODO: prueba de todo
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const getAllNotes = async () => {
      const initialNotes = await noteService.getAll()
      setNotes(initialNotes)
    }

    getAllNotes()
  }, [])

  const handleSubmit = async (loginObject) => {
    try {
      const returnedUser = await loginService.login(loginObject)
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(returnedUser))
      noteService.setToken(returnedUser.token)
      setUser(returnedUser)
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const toggleImportanceOf = async (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    try {
      const returnedNote = await noteService.update(id, changedNote)
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    } catch (error) {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    }
  }

  const addNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility()
    const returnedNote = await noteService.create(noteObject)
    setNotes(notes.concat(returnedNote))
  }

  const note = () => (
    <Togglable buttonLabel='New note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm handleSubmit={handleSubmit} />
      </Togglable>
    )
  }
  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }
  return (
    <div>
      <h1>Notes app</h1>
      <Notification message={errorMessage} />

      {user === null ? loginForm() : <div> <p>{user.name} logge-in</p> {note()} </div>}
      {user === null ? '' : <button onClick={logout}>Logout</button>}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        <ul>
          {notesToShow.map(note =>
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )}
        </ul>
      </ul>
      <Footer />
    </div>
  )
}

export default App
