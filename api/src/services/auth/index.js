const {login} = require('./login')
const {register} = require('./register')
const {loginByToken} = require('./login-by-token')

exports.auth = {login, register, loginByToken}
