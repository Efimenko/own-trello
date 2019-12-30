const {validator} = require('../../validator')
const {userValidationSchema} = require('../../validator/user')
const {
  validationErrorObject,
} = require('../utils/validation/validation-error-object')

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
  it('Should return error when there is not name in passed data', () => {
    const data = {
      email: 'someemail@gmail.com',
      password: 'somepassword',
    }
    const {valid, errors} = validator({
      schema: userValidationSchema.add,
      data,
    })
    expect(validationErrorObject({valid, errors})).toBe(true)
    expect(errors[0].keyword).toBe('required')
    expect(errors[0].params.missingProperty).toBe('name')
  })
  it('Should return error when name is too long in passed data', () => {
    const data = {
      name: 's'.repeat(101),
      email: 'someemail@gmail.com',
      password: 'somepassword',
    }
    const {valid, errors} = validator({
      schema: userValidationSchema.add,
      data,
    })
    expect(validationErrorObject({valid, errors})).toBe(true)
    expect(errors[0].keyword).toBe('maxLength')
    expect(errors[0].params.limit).toBe(100)
  })
})
