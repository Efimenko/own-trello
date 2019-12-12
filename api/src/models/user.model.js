const mongoose = require('mongoose')

const {Schema} = mongoose

const UserSchema = new Schema({
  name: {
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

UserSchema.index(
  {email: 1},
  {
    name: 'user_unique_email',
    unique: true,
    partialFilterExpression: {email: {$exists: true}},
  }
)

module.exports = mongoose.model('User', UserSchema)
