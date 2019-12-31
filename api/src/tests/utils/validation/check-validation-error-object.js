const {checkType} = require('../../../utils')

const checkValidationErrorObject = ({valid, errors}) => {
  expect(valid).toBe(false)
  expect(errors).not.toBeUndefined()
  expect(Array.isArray(errors)).toBe(true)
  expect(errors.length).not.toBeLessThan(1)
  errors.forEach((error) => expect(checkType(error)).toBe('Object'))
  return true
}

exports.checkValidationErrorObject = checkValidationErrorObject
