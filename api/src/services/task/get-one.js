const TaskSchema = require('../../models/task.model')

const getOne = ({_id, userId}) => {
  return TaskSchema.findById({_id, owner: userId})
    .then((task) => ({status: 200, data: task}))
    .catch((err) => ({status: 500, data: err.message}))
}

exports.getOne = getOne
