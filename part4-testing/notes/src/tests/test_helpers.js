import app from '../app'
import { Note } from '../models/notes'
import { User } from '../models/users'
import supertest from 'supertest'

const api = supertest(app)

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon', date: new Date() })
  await note.save()

  await Note.deleteOne({ _id: note._id })
  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}
export default {
  api, initialNotes, nonExistingId, notesInDb, usersInDb
}
