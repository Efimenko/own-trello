const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/trello', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const TaskSchema = new mongoose.Schema({
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
