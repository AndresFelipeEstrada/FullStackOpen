import './App.css'
import { getAll, createNote, updateNote } from './services/notes'
import { useQuery, useMutation, useQueryClient } from 'react-query'

function App () {
  const queryClient = useQueryClient()
  const response = useQuery('notes', getAll, {
    refetchOnWindowFocus: false
  })

  const newNoteMutation = useMutation(createNote, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData('notes')
      queryClient.setQueryData('notes', notes.concat(newNote))
    }
  })

  const updatedNoteMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries('notes')
    }
  })

  const handleImportan = (note) => {
    updatedNoteMutation.mutate({ ...note, important: !note.important })
  }

  const handleForm = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: false })
  }

  if (response.isLoading) {
    return <div>Cargando...</div>
  }

  let notes = []
  notes = response.data
  return (
    <>
      <h1>Notes</h1>

      <form onSubmit={handleForm}>
        <input name="note" />
        <button>Send</button>
      </form>
      {notes.map((note) => (
        <li key={note.id} onClick={() => handleImportan(note)}>
          {note.content}
          <strong>{note.important ? ' Important ' : ''}</strong>
        </li>
      ))}
    </>
  )
}

export default App
