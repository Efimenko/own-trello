const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const UserSchema = require('../../models/user.model')
const {omit} = require('../../utils')

const login = ({email, password}) => {
  const hashedPassword = crypto
    .createHash('md5')
    .update(process.env.SECRET_KEY + ':' + password)
    .digest('hex')

  return UserSchema.findOne({email: email, password: hashedPassword})
    .then((user) => {
      if (user) {
        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY)
        return {status: 200, token, data: omit(['password'])(user)}
      } else {
        return {status: 401, data: 'Unauthorized'}
      }
    })
    .catch((err) => ({status: 500, data: err.message}))
}

exports.login = login
