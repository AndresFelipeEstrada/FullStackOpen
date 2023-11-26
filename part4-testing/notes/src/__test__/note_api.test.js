import request from 'supertest'
import app from '../app.js'
import { Note } from '../models/note.js'
import helpers from './test_helpers.js'
import mongoose from 'mongoose'

describe('Test the root path', () => {
  test('It should response the GET method', () => {
    return request(app)
      .get('/')
      .expect(200)
  })
})
// it('a specific note is within the returned notes', async () => {
//   await api
//     .get('/api/notes/')
//     .expect(200)
//     .end((err, res) => {
//       if (err) throw err
//       const contents = res.body.map(r => r.content)
//       expect(contents).toContain('Browser can execute only Javascript')
//     })
// })
//
// it('the first note is about HTTP methods', async () => {
//   await api
//     .get('/api/notes/')
//     .expect(200)
//     .end((err, res) => {
//       if (err) throw err
//       expect(res.body[0].content).toBe('HTML is easy')
//     })
// })

// describe('POST /api/notes', () => {
//   it('a valid note can be added', async () => {
//     const newNote = {
//       content: 'nota de prueba',
//       important: true
//     }
//     await api
//       .post('/api/notes/')
//       .send(newNote)
//       .expect(200)
//       .expect('Content-Type', /application\/json/)
//
//     await api
//       .get('/api/notes')
//       .end((err, _res) => {
//         if (err) throw err
//         helpers.notesInDb().then(notesAtEnd => {
//           expect(notesAtEnd).toHaveLength(helpers.initialNotes.length + 1)
//           const contents = notesAtEnd.map(note => note.content)
//           expect(contents).toContain('nota de prueba')
//         })
//       })
//   })
//
//   it('note without content is not added', async () => {
//     const newNote = {
//       important: true
//     }
//
//     await api
//       .post('/api/notes/')
//       .send(newNote)
//       .expect(400)
//
//     await api
//       .get('/api/notes')
//       .end((err, _res) => {
//         if (err) throw err
//         helpers.notesInDb().then(result => {
//           expect(result).toHaveLength(helpers.initialNotes.length)
//         })
//       })
//   })
// })
//
// describe('GET ONE /api/notes', () => {
//   it('a specific note can be viewed', async () => {
//     const noteToView = await helpers.notesInDb()
//
//     const response = await api
//       .get(`/api/notes/${noteToView.id}`)
//       .expect(200)
//       .expect('Content-Type', /application\/json/)
//
//     console.log(response.status)
//
//     const processedNoteToView = JSON.parse(JSON.stringify(noteToView))
//     expect(response.body).toEqual(processedNoteToView)
//   })
// })
// beforeAll(async () => {
//   await Note.deleteMany({})
//   let noteObject = new Note(helpers.initialNotes[0])
//   await noteObject.save()
//   noteObject = new Note(helpers.initialNotes[1])
//   await noteObject.save()
// })
