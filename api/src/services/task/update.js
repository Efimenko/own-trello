const TaskSchema = require('../../models/task.model')

const update = ({_id, userId, title, description}) => {
  return TaskSchema.updateOne(
    {_id, owner: userId},
    {$set: {title, description}}
  )
    .then((data) => ({status: 200, data}))
    .catch((err) => ({status: 500, data: err.message}))
}

exports.update = update
