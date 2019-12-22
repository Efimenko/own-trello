const {
  connectToDatabase,
  closeConnectionToDatabase,
  clearDatabase,
} = require('../in-memory-mongo')
const {auth} = require('../../services/auth')

beforeAll(async () => await connectToDatabase())
afterEach(async () => await clearDatabase())
afterAll(async () => await closeConnectionToDatabase())

describe('Auth service', () => {
  it('Should register user', async (done) => {
    const dataForUser = {
      name: 'some name',
      email: 'someeemail@gmail.com',
      password: '11111',
    }
    const {status, token, data} = await auth.register(dataForUser)
    expect(status).toBe(201)
    expect(token).not.toBeUndefined()
    expect(data).toHaveProperty('_id')
    expect(data).toHaveProperty('name')
    expect(data).toHaveProperty('email')
    done()
  })
})
