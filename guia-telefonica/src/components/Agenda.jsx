import { useEffect, useState } from 'react'
import phoneBook from '../services/getPersons'

const Agenda = () => {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    const getData = async () => {
      const data = await phoneBook.getPersons()
      setPersons(data)
    }

    getData()
  }, [])

  const newEntry = event => setName(event.target.value)

  const newPhoneEntry = event => setPhone(event.target.value)

  const addNewUser = async (event) => {
    if (window !== undefined) {
      event.preventDefault()
      const newObject = {
        id: window.crypto.randomUUID(),
        name,
        number: phone
      }

      const createdPerson = await phoneBook.postPersons(newObject)

      setPersons(persons.concat(createdPerson))

      setName('')
      setPhone('')
    }
  }

  const handlePerson = async (id) => {
    const findPerson = persons.find(person => person.id === id)
    if (!findPerson) return console.log('Usuario no encontrado')

    await phoneBook.deletePerson(id)
    setPersons(persons.filter(person => person.id !== id))
    console.log(`Eliminaste el usuario: ${id}`)
  }

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={addNewUser}>
          <div>
            name: <input value={name} onChange={newEntry}/>
            phone: <input type="number" value={phone} onChange={newPhoneEntry} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>

    <div>
    {persons.map((person, index) => (
      <div key={index}>
      <p> {person.name} - {person.number}</p>
      <button onClick={() => handlePerson(person.id)}>Eliminar</button>
      </div>
    ))}
    </div>

      </div>
      </>
  )
}

export default Agenda
