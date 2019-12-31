const {validator} = require('../../validator')
const {userValidationSchema} = require('../../validator/user')
const {
  checkValidationErrorObject,
} = require('../utils/validation/check-validation-error-object')

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
  /* Check name field */
  it('Should return error when there is not name in passed data', () => {
    const data = {
      email: 'someemail@gmail.com',
      password: 'somepassword',
    }
    const {valid, errors} = validator({
      schema: userValidationSchema.add,
      data,
    })
    expect(checkValidationErrorObject({valid, errors})).toBe(true)
    expect(errors[0].keyword).toBe('required')
    expect(errors[0].params.missingProperty).toBe('name')
  })
  it('Should return error when name is too short in passed data', () => {
    const data = {
      name: 's',
      email: 'someemail@gmail.com',
      password: 'somepassword',
    }
    const {valid, errors} = validator({
      schema: userValidationSchema.add,
      data,
    })
    expect(checkValidationErrorObject({valid, errors})).toBe(true)
    expect(errors[0].keyword).toBe('minLength')
    expect(errors[0].params.limit).toBe(3)
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
    expect(checkValidationErrorObject({valid, errors})).toBe(true)
    expect(errors[0].keyword).toBe('maxLength')
    expect(errors[0].params.limit).toBe(100)
  })
  it('Should return error when name is not string', () => {
    const data = {
      name: 1111,
      email: 'someemail@gmail.com',
      password: 'somepassword',
    }
    const {valid, errors} = validator({
      schema: userValidationSchema.add,
      data,
    })
    expect(checkValidationErrorObject({valid, errors})).toBe(true)
    expect(errors[0].keyword).toBe('type')
    expect(errors[0].params.type).toBe('string')
  })
  /* Check email field */
  it('Should return error when there is not email in passed data', () => {
    const data = {
      name: 'some name',
      password: 'somepassword',
    }
    const {valid, errors} = validator({
      schema: userValidationSchema.add,
      data,
    })
    expect(checkValidationErrorObject({valid, errors})).toBe(true)
    expect(errors[0].keyword).toBe('required')
    expect(errors[0].params.missingProperty).toBe('email')
  })
  it('Should return error when passed email is not correct', () => {
    const data = {
      name: 'some name',
      email: 'someincorrectemail',
      password: 'somepassword',
    }
    const {valid, errors} = validator({
      schema: userValidationSchema.add,
      data,
    })
    expect(checkValidationErrorObject({valid, errors})).toBe(true)
    expect(errors[0].keyword).toBe('format')
    expect(errors[0].params.format).toBe('email')
  })
  it('Should return error when email is too short in passed data', () => {
    const data = {
      name: 'some name',
      email: 's@g.',
      password: 'somepassword',
    }
    const {valid, errors} = validator({
      schema: userValidationSchema.add,
      data,
    })
    expect(checkValidationErrorObject({valid, errors})).toBe(true)
    expect(errors[0].keyword).toBe('minLength')
    expect(errors[0].params.limit).toBe(5)
  })
  it('Should return error when email is too long in passed data', () => {
    const data = {
      name: 'some name',
      email: `${'s'.repeat(300)}omeemail@gmail.com`,
      password: 'somepassword',
    }
    const {valid, errors} = validator({
      schema: userValidationSchema.add,
      data,
    })
    expect(checkValidationErrorObject({valid, errors})).toBe(true)
    expect(errors[0].keyword).toBe('maxLength')
    expect(errors[0].params.limit).toBe(256)
  })
  it('Should return error when email is not string', () => {
    const data = {
      name: 'some name',
      email: 1111,
      password: 'somepassword',
    }
    const {valid, errors} = validator({
      schema: userValidationSchema.add,
      data,
    })
    expect(checkValidationErrorObject({valid, errors})).toBe(true)
    expect(errors[0].keyword).toBe('type')
    expect(errors[0].params.type).toBe('string')
  })
  /* Check password field */
  it('Should return error when there is not password in passed data', () => {
    const data = {
      name: 'some name',
      email: 'someemail@gmail.com',
    }
    const {valid, errors} = validator({
      schema: userValidationSchema.add,
      data,
    })
    expect(checkValidationErrorObject({valid, errors})).toBe(true)
    expect(errors[0].keyword).toBe('required')
    expect(errors[0].params.missingProperty).toBe('password')
  })
  it('Should return error when password is too short in passed data', () => {
    const data = {
      name: 'some name',
      email: 'someemail@gmail.com',
      password: 'pass',
    }
    const {valid, errors} = validator({
      schema: userValidationSchema.add,
      data,
    })
    expect(checkValidationErrorObject({valid, errors})).toBe(true)
    expect(errors[0].keyword).toBe('minLength')
    expect(errors[0].params.limit).toBe(6)
  })
  it('Should return error when password is too long in passed data', () => {
    const data = {
      name: 'some name',
      email: 'someemail@gmail.com',
      password: 'pass'.repeat(100),
    }
    const {valid, errors} = validator({
      schema: userValidationSchema.add,
      data,
    })
    expect(checkValidationErrorObject({valid, errors})).toBe(true)
    expect(errors[0].keyword).toBe('maxLength')
    expect(errors[0].params.limit).toBe(256)
  })
  it('Should return error when password is not string', () => {
    const data = {
      name: 1111,
      email: 'someemail@gmail.com',
      password: 123456789,
    }
    const {valid, errors} = validator({
      schema: userValidationSchema.add,
      data,
    })
    expect(checkValidationErrorObject({valid, errors})).toBe(true)
    expect(errors[0].keyword).toBe('type')
    expect(errors[0].params.type).toBe('string')
  })
  /* Check additional fields in passed data */
  it('Should return error when send additional data that there are not in schema declaration', () => {
    const data = {
      name: 'name',
      email: 'someemail@gmail.com',
      password: 'somepassword',
      someData: true,
      someData2: 'somestring',
    }
    const {valid, errors} = validator({
      schema: userValidationSchema.add,
      data,
    })
    expect(checkValidationErrorObject({valid, errors})).toBe(true)
    expect(errors[0].keyword).toBe('additionalProperties')
    expect(errors[0].params.additionalProperty).toBe('someData')
    expect(errors[1].keyword).toBe('additionalProperties')
    expect(errors[1].params.additionalProperty).toBe('someData2')
  })
})
