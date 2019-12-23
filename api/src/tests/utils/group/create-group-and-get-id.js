const {group} = require('../../../services/group')

const createGroupAndGetId = async ({userId}) => {
  const groupData = {title: 'Some group title', userId}
  const {data} = await group.add(groupData)
  return data._id
}

exports.createGroupAndGetId = createGroupAndGetId
