import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getNotes = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const postNewNote = async (content) => {
  try {
    const object = { content, important: false }
    const response = await axios.post(baseUrl, object)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const patchNoteImportant = async (id, important) => {
  try {
    const { data } = await axios.patch(`${baseUrl}/${id}`, important)
    return data
  } catch (error) {
    console.log(error.messages)
  }
}

export default { getNotes, postNewNote, patchNoteImportant }
