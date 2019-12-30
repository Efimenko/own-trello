const {validator} = require('../../validator')
const {userValidationSchema} = require('../../validator/user')

describe('Add user data validator', () => {
  it('Should not return any errors when all passed data is right', () => {
    const data = {
      name: 'some name',
      email: 'someemail@gmail.com',
      password: 'somepassword',
    }
    const {valid} = validator({schema: userValidationSchema.add, data})
    expect(valid).toBe(true)
  })
})
