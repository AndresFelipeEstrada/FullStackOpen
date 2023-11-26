import app from '../app.js'
import request from 'supertest'
import { Note } from '../models/notes.js'
import helpers from './test_helpers.js'

const api = request(app)

beforeAll(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(helpers.initialNotes[0])
  await noteObject.save()
  noteObject = new Note(helpers.initialNotes[1])
  await noteObject.save()
})

test('notes are returned as json', async () => {
  const response = await api.get('/api/notes')
  expect(response.statusCode).toBe(200)
})
