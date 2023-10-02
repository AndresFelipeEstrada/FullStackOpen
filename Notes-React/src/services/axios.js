import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getNotes = async () => {
  const axiosFetch = await axios.get(baseUrl)
  return axiosFetch.data
}

const postNotes = async (addNote) => {
  try {
    const newNote = await axios.post(baseUrl, addNote)
    return newNote
  } catch (error) {
    console.log(`Error al publicar nota ${error.message}`)
  }
}

const updateNote = async (id, changedNote) => {
  try {
    const newNote = await axios.patch(`${baseUrl}/${id}`, changedNote)
    return newNote.data
  } catch (error) {
    console.log(`Error al actualizar nota ${error.message}`)
  }
}

export default {
  getAll: getNotes,
  create: postNotes,
  update: updateNote
}
