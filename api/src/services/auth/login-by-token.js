const jwt = require('jsonwebtoken')

const UserSchema = require('../../models/user.model')
const {omit} = require('../../utils')

const loginByToken = ({token}) => {
  const {_id} = jwt.decode(token)

  return UserSchema.findOne({_id})
    .then((user) => {
      if (user) {
        return {status: 200, data: omit(['password'])(user)}
      } else {
        return {status: 401, data: 'Unauthorized'}
      }
    })
    .catch((err) => ({status: 500, data: err.message}))
}

exports.loginByToken = loginByToken
