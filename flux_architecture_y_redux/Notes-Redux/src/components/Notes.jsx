import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import noteServices from '../services/notes'
import Note from './Note'

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'all') {
      return notes
    }

    return filter === 'important'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  })

  const hanldeImportance = async (note) => {
    const object = {
      ...note,
      important: !note.important
    }
    const changeImportant = await noteServices.patchNoteImportant(note.id, object)
    dispatch(toggleImportanceOf(changeImportant))
  }

  return (
    <>

      <ul>
        {notes.map(note => (
          <Note
            key={`notes-${note.id}`}
            note={note}
            handleClick={() => hanldeImportance(note)
            }
          />
        ))}
      </ul>
    </>
  )
}

export default Notes
