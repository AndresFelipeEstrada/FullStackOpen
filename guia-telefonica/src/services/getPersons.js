import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = async () => {
  try {
    const data = await axios.get(baseUrl)
    return data.data
  } catch (error) {
    console.log(error)
  }
}

const postPersons = async (personObject) => {
  try {
    const createdUser = await axios.post(baseUrl, personObject)
    return createdUser.data
  } catch (error) {
    console.log(`Error al crear usuario en agenda: ${error.message}`)
  }
}

const deletePerson = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`)
  } catch (error) {
    console.log(`Error al actualizar usuario en agenda: ${error.message}`)
  }
}

export default { getPersons, postPersons, deletePerson }
