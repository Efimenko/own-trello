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

  it('Should return one task object when get one task', async () => {
    const userId = await userUtils.createUserAndGetId()
    const groupId = await groupUtils.createGroupAndGetId({userId})
    const taskData = {
      parent: groupId,
      title: 'Some task title',
      description: 'Some task description',
      userId,
    }
    const {
      data: {_id},
    } = await task.add(taskData)
    const {status, data} = await task.getOne({_id, userId})
    expect(status).toBe(200)
    expect(Array.isArray(data)).toBe(false)
    expect(data._id).toEqual(_id)
    expect(data.title).toBe(taskData.title)
    expect(data.description).toBe(taskData.description)
    expect(data.owner).toEqual(userId)
    expect(data.parent).toEqual(groupId)
  })

  it('Should remove task', async () => {
    const userId = await userUtils.createUserAndGetId()
    const groupId = await groupUtils.createGroupAndGetId({userId})
    const taskData = {
      parent: groupId,
      title: 'Some task title',
      description: 'Some task description',
      userId,
    }
    const {
      data: {_id},
    } = await task.add(taskData)
    const {status, data} = await task.remove({_id, userId})
    expect(status).toBe(200)
    expect(data.deletedCount).toBe(1)
    const {data: allTasks} = await task.getAll({userId})
    expect(allTasks.length).toBe(0)
  })

  it('Should update task', async () => {
    const userId = await userUtils.createUserAndGetId()
    const groupId = await groupUtils.createGroupAndGetId({userId})
    const taskData = {
      parent: groupId,
      title: 'Some task title',
      description: 'Some task description',
      userId,
    }
    const updateData = {
      title: 'New title',
      description: 'New description',
    }
    const {
      data: {_id},
    } = await task.add(taskData)
    const {status, data} = await task.update({_id, userId, ...updateData})
    expect(status).toBe(200)
    expect(data.nModified).toBe(1)
    expect(data.ok).toBe(1)
  })
})
