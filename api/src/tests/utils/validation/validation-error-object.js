const {checkType} = require('../../../utils')

const validationErrorObject = ({valid, errors}) => {
  expect(valid).toBe(false)
  expect(errors).not.toBeUndefined()
  expect(Array.isArray(errors)).toBe(true)
  expect(errors.length).toBe(1)
  expect(checkType(errors[0])).toBe('Object')
  return true
}

exports.validationErrorObject = validationErrorObject
