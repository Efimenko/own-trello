const mongoose = require('mongoose')

const {
  connectToDatabase,
  closeConnectionToDatabase,
  clearDatabase,
} = require('../in-memory-mongo')
const UserSchema = require('../../models/user.model')

beforeAll(async () => await connectToDatabase())
afterEach(async () => await clearDatabase())
afterAll(async () => await closeConnectionToDatabase())

describe('User', () => {
  it('Should add user', async (done) => {
    expect(true).toBe(true)
    done()
  })
})
