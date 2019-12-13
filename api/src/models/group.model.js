const mongoose = require('mongoose')

const {Schema} = mongoose

const GroupSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
})

module.exports = mongoose.model('Group', GroupSchema)
