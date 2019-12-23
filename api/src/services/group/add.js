const GroupSchema = require('../../models/group.model')

const add = ({title, userId}) => {
  const group = new GroupSchema({title, owner: userId})
  return group
    .save()
    .then((group) => ({status: 201, data: group}))
    .catch((err) => ({status: 500, data: err.message}))
}

exports.add = add
