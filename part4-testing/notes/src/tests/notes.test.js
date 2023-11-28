import app from '../app.js'
import request from 'supertest'
import { Note } from '../models/notes.js'
import helpers from './test_helpers.js'

const api = request(app)

beforeEach(async () => {
  await Note.deleteMany({})
  const noteObjects = helpers.initialNotes.map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
})

describe('GET /api/notes', () => {
  test('notes are returned as json', async () => {
    const response = await api.get('/api/notes')
    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
  })

  test('there are two notes', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(helpers.initialNotes.length)
  })

  test('the first note is about HTML methods', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(note => note.content)

    expect(contents).toContain('Browser can execute only Javascript')
  })

  test('a specific note can be viewed', async () => {
    const noteAtStart = await helpers.notesInDb()

    const noteToView = noteAtStart[0]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

    expect(resultNote.body).toEqual(processedNoteToView)
  })
})

describe('POST /api/notes', () => {
  test('a valid note can be added', async () => {
    const newNote = {
      content: 'nueva nota',
      important: true
    }

    await api.post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helpers.notesInDb()
    expect(notesAtEnd).toHaveLength(helpers.initialNotes.length + 1)

    const contents = notesAtEnd.map(note => note.content)
    expect(contents).toContain('nueva nota')
  })

  test('note without content is not added', async () => {
    const newNote = {
      important: true
    }

    await api.post('/api/notes')
      .send(newNote)
      .expect(400)

    const notesAtEnd = await helpers.notesInDb()
    expect(notesAtEnd).toHaveLength(helpers.initialNotes.length)
  })
})
