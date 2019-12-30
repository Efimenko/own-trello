const Ajv = require('ajv')
let ajv = new Ajv({allErrors: true})
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))

const validator = ({schema, data}) => {
  const validate = ajv.compile(schema)
  const valid = validate(data)
  if (!valid) {
    return {valid: false, errors: validate.errors}
  } else {
    return {valid: true}
  }
}

exports.validator = validator
