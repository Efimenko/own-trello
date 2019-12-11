const mongoose = require('mongoose')

const {Schema} = mongoose

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    maxlength: 255,
  },
})

module.exports = mongoose.model('User', UserSchema)
