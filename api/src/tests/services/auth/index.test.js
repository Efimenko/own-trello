const {
  connectToDatabase,
  closeConnectionToDatabase,
  clearDatabase,
} = require('../../in-memory-mongo')
const {auth} = require('../../../services/auth')

beforeAll(async () => await connectToDatabase())
afterEach(async () => await clearDatabase())
afterAll(async () => await closeConnectionToDatabase())

describe('Auth service', () => {
  it('Should has SECRET_KEY in enviroment variables', () => {
    expect(process.env.SECRET_KEY).not.toBeUndefined()
  })

  it('Should register user', async (done) => {
    const userData = {
      name: 'some name',
      email: 'someeemail@gmail.com',
      password: '11111',
    }
    const {status, token, data} = await auth.register(userData)
    expect(status).toBe(201)
    expect(token).not.toBeUndefined()
    expect(data).toHaveProperty('_id')
    expect(data).toHaveProperty('name')
    expect(data).toHaveProperty('email')
    done()
  })

  it('Should login user', async (done) => {
    const userData = {
      name: 'some name',
      email: 'someeemail@gmail.com',
      password: '11111',
    }
    await auth.register(userData)
    const {status, token, data} = await auth.login({
      email: userData.email,
      password: userData.password,
    })
    expect(status).toBe(200)
    expect(token).not.toBeUndefined()
    expect(data).toHaveProperty('_id')
    expect(data).toHaveProperty('name')
    expect(data).toHaveProperty('email')
    done()
  })

  it('Should login user by token', async (done) => {
    const userData = {
      name: 'some name',
      email: 'someeemail@gmail.com',
      password: '11111',
    }
    const {token} = await auth.register(userData)
    const {status, data} = await auth.loginByToken({
      token,
    })
    expect(status).toBe(200)
    expect(data).toHaveProperty('_id')
    expect(data).toHaveProperty('name')
    expect(data).toHaveProperty('email')
    done()
  })
})
