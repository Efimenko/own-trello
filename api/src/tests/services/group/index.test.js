const {
  connectToDatabase,
  closeConnectionToDatabase,
  clearDatabase,
} = require('../../utils/in-memory-mongo')
const {group} = require('../../../services/group')
const {userUtils} = require('../../utils/user')

beforeAll(async () => await connectToDatabase())
afterEach(async () => await clearDatabase())
afterAll(async () => await closeConnectionToDatabase())

describe('Group service', () => {
  it('Should create group', async () => {
    const userId = await userUtils.createUserAndGetId()
    const groupData = {title: 'Some title', userId}
    const {
      status,
      data: {_id, title},
    } = await group.add(groupData)

    expect(status).toBe(201)
    expect(_id).not.toBeUndefined()
    expect(title).not.toBeUndefined()
    expect(title).toBe(groupData.title)
  })

  it('Should return list of groups', async () => {
    const userId = await userUtils.createUserAndGetId()
    const groupData = {title: 'Some title', userId}
    await group.add(groupData)
    await group.add(groupData)
    const {status, data} = await group.getAll({userId})

    expect(status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data).toHaveLength(2)
    expect(data[0].title).toBe(groupData.title)
    expect(data[1].title).toBe(groupData.title)
  })
})
