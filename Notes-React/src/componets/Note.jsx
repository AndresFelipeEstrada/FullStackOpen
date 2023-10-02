import './notes.css'

const Note = function ({ note, toggleImportance }) {
  const label = note.important ? 'Cambiar a no importante' : 'Cambiar a importante'
  return (
  <li className='note'>
    <p>
      {note.content} - <strong>{note.important ? 'Importante' : 'No importante'}</strong>
      <button onClick={toggleImportance}>{label}</button>
    </p>
  </li>)
}

export default Note
