const {auth} = require('../../../services/auth')

const createUserAndGetId = async () => {
  const userData = {
    name: 'some name',
    email: 'someeemail@gmail.com',
    password: '11111',
  }
  const {
    data: {_id},
  } = await auth.register(userData)
  return _id
}

exports.createUserAndGetId = createUserAndGetId
