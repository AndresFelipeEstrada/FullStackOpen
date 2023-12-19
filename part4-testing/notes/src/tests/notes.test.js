import { Note } from '../models/notes.js'
import helpers from './test_helpers.js'

beforeEach(async () => {
  await Note.deleteMany({})
  const noteObjects = helpers.initialNotes.map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await helpers.api.get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await helpers.api.get('/api/notes')
    expect(response.body).toHaveLength(helpers.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await helpers.api.get('/api/notes')
    const contents = response.body.map(note => note.content)

    expect(contents).toContain('Browser can execute only Javascript')
  })
})
describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const noteAtStart = await helpers.notesInDb()

    const noteToView = noteAtStart[0]

    const resultNote = await helpers.api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

    expect(resultNote.body).toEqual(processedNoteToView)
  })

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helpers.nonExistingId()

    await helpers.api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is isvalid', async () => {
    const invalidId = '4353453535434534DS1DFSF'

    await helpers.api
      .get(`/api/notes/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new note', () => {
  test('succeeds with valid data', async () => {
    const newNote = {
      content: 'nueva nota',
      important: true
    }

    await helpers.api.post('/api/notes')
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

    await helpers.api.post('/api/notes')
      .send(newNote)
      .expect(400)

    const notesAtEnd = await helpers.notesInDb()
    expect(notesAtEnd).toHaveLength(helpers.initialNotes.length)
  })
})

describe('deeletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await helpers.notesInDb()
    const noteToDelete = notesAtStart[0]

    await helpers.api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await helpers.notesInDb()

    expect(notesAtEnd).toHaveLength(helpers.initialNotes.length - 1)

    const contents = notesAtEnd.map(r => r.content)
    expect(contents).not.toContain(noteToDelete.content)
  })
})
