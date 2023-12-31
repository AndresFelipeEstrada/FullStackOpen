import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNote = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input type="text" name='note' />
        <button type='submit'>Add Note</button>
      </form>
    </div>
  )
}

export default NewNote
