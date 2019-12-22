const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const UserSchema = require('../../models/user.model')
const {omit} = require('../../utils')

const register = ({name, email, password}) => {
  const hashedPassword = crypto
    .createHash('md5')
    .update(process.env.SECRET_KEY + ':' + password)
    .digest('hex')

  const user = new UserSchema({name, email, password: hashedPassword})

  return user
    .save()
    .then((newUser) => {
      const token = jwt.sign({_id: newUser._id}, process.env.SECRET_KEY)
      return {status: 201, token, data: omit(['password'])(newUser)}
    })
    .catch((err) => ({status: 500, data: err.message}))
}

exports.register = register
