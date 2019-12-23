const TaskSchema = require('../../models/task.model')

const add = ({parent, title, description, userId}) => {
  const task = new TaskSchema({parent, title, description, owner: userId})
  return task
    .save()
    .then((task) => ({status: 201, data: task}))
    .catch((err) => ({status: 500, data: err.message}))
}

exports.add = add
