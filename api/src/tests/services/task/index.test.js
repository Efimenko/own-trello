const {
  connectToDatabase,
  closeConnectionToDatabase,
  clearDatabase,
} = require('../../utils/in-memory-mongo')
const {userUtils} = require('../../utils/user')
const {groupUtils} = require('../../utils/group')
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

  it('Should add task', async () => {
    const userId = await userUtils.createUserAndGetId()
    const groupId = await groupUtils.createGroupAndGetId({userId})
    const taskData = {
      parent: groupId,
      title: 'Some task title',
      description: 'Some task description',
      userId,
    }
    const {
      status,
      data: {_id, title, description, owner},
    } = await task.add(taskData)
    expect(status).toBe(201)
    expect(_id).not.toBeUndefined()
    expect(title).toBe(taskData.title)
    expect(description).toBe(taskData.description)
    expect(owner).toBe(userId)
  })

  it('Should return array of task when get all tasks', async () => {
    const userId = await userUtils.createUserAndGetId()
    const groupId = await groupUtils.createGroupAndGetId({userId})
    const taskData = {
      parent: groupId,
      title: 'Some task title',
      description: 'Some task description',
      userId,
    }
    await task.add(taskData)
    await task.add(taskData)
    const {status, data} = await task.getAll({userId})
    expect(status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data).toHaveLength(2)
  })
})
