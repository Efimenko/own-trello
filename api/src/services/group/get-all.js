const GroupSchema = require('../../models/group.model')

const getAll = ({userId}) => {
  return GroupSchema.find({owner: userId})
    .then((groups) => ({status: 200, data: groups}))
    .catch((err) => ({status: 500, data: err.message}))
}

exports.getAll = getAll
