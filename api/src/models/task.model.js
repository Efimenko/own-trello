const mongoose = require('mongoose')

const {Schema} = mongoose

const TaskSchema = new Schema({
  parent: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
})

module.exports = mongoose.model('Task', TaskSchema)
