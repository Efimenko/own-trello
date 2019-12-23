const TaskSchema = require('../../models/task.model')

const remove = ({_id, userId}) => {
  return TaskSchema.deleteOne({_id, owner: userId})
    .then((data) => ({status: 200, data}))
    .catch((err) => ({status: 500, data: err.message}))
}

exports.remove = remove
