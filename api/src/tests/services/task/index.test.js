const {
  connectToDatabase,
  closeConnectionToDatabase,
  clearDatabase,
} = require('../../utils/in-memory-mongo')
const {userUtils} = require('../../utils/user')
const {task} = require('../../../services/task')

beforeAll(async () => await connectToDatabase())
afterEach(async () => await clearDatabase())
afterAll(async () => await closeConnectionToDatabase())

describe('Task service', () => {
  it('Should return empty array when get all tasks for user that has not tasks', async () => {
    const userId = await userUtils.createUserAndGetId()
    const {status, data} = await task.getAll({userId})
    expect(status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data).toHaveLength(0)
  })

  // it('Should return array of task when get all tasks', async () => {
  // const userId = await userUtils.createUserAndGetId()
  // await task.add({})
  // const {status, data} = await task.getAll({userId})
  // expect(status).toBe(200)
  // expect(Array.isArray(data)).toBe(true)
  // expect(data).toHaveLength(0)
  // })
})
