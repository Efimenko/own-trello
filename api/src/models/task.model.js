const mongoose = require('mongoose')

const {Schema} = mongoose

const TaskSchema = new Schema({
  parent: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
})

module.exports = mongoose.model('Task', TaskSchema)
