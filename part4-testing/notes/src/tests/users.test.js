import bcrypt from 'bcrypt'
import { User } from '../models/users.js'
import helpers from './test_helpers.js'

describe('when there is initially one user  in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const userAtStart = await helpers.usersInDb()

    const newUser = {
      username: 'user_test',
      name: 'user test name',
      password: 'testPassword'
    }

    await helpers.api.post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const userAtEnd = await helpers.usersInDb()
    expect(userAtEnd).toHaveLength(userAtStart.length + 1)

    const usernames = userAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})
