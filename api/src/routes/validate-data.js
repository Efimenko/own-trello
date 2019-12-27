const Ajv = require('ajv')
let ajv = new Ajv({allErrors: true})
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))

const validateData = (schema) => (req, res, next) => {
  const validate = ajv.compile(schema)
  const {body: data} = req
  const valid = validate(data)
  if (!valid) {
    res.status(400).send(validate.errors)
  } else {
    next()
  }
}

exports.validateData = validateData
