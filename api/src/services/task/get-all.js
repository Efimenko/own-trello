const TaskSchema = require('../../models/task.model')

const getAll = ({userId}) => {
  return TaskSchema.find({owner: userId})
    .then((tasks) => ({status: 200, data: tasks}))
    .catch((err) => ({status: 500, data: err.message}))
}

exports.getAll = getAll
