import app from '../app'
import supertest from 'supertest'
import { listBlogs } from '../utils/list_helpers.js'
import { Blog } from '../models/blogs'
import { User } from '../models/users.js'

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const createBlog = listBlogs.map(blog => new Blog(blog))
  const saveBlog = createBlog.map(b => b.save())
  await Promise.all(saveBlog)
})

describe('GET /api/blogs', () => {
  test('GET', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(listBlogs.length)
  })

  test('Existe la propiedad id', async () => {
    const response = await api.get('/api/blogs').expect(200)
    const firstBlog = response.body[0]
    expect(firstBlog.id).toBeDefined()
  })
})

describe('POST /api/blogs', () => {
  test('Create new blog', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10
    }

    const newUser = {
      username: 'camilo',
      name: 'camilo andres',
      password: '12345'
    }
    await api.post('/api/users').send(newUser).expect(200)

    const user = await api.post('/api/login').send(newUser).expect(200)
    await api.post('/api/blogs').send(newBlog).expect(201).set('Authorization', `Bearer ${user.body.token}`)

    const response = await api.get('/api/blogs')
    expect(response.body.map(blog => blog.author)).toContain('Edsger W. Dijkstra')
    expect(response.body).toHaveLength(listBlogs.length + 1)
  })

  test('Falta una propiedad al crear un blog', async () => {
    const newBlogWithoutLikes = {
      likes: 5
    }
    const newUser = {
      username: 'andres',
      name: 'andres',
      password: '12345'
    }
    await api.post('/api/users').send(newUser).expect(200)
    const user = await api.post('/api/login').send(newUser).expect(200)

    await api.post('/api/blogs')
      .send(newBlogWithoutLikes)
      .set('Authorization', `Bearer ${user.body.token}`)
      .expect(400)
      .expect(response => {
        expect(response.body.error).toEqual('Faltan datos')
      })
  })

  test('Faltan las propiedades title y url', async () => {
    const newBlogWithoutTitleAndUrl = {
      author: 'prueba'
    }
    const newUser = {
      username: 'frank',
      name: 'franco',
      password: '12345'
    }
    await api.post('/api/users').send(newUser).expect(200)
    const user = await api.post('/api/login').send(newUser).expect(200)
    await api.post('/api/blogs')
      .send(newBlogWithoutTitleAndUrl)
      .set('Authorization', `Bearer ${user.body.token}`)
      .expect(400)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(listBlogs.length)
  })
})
