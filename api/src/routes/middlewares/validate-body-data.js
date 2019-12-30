const Ajv = require('ajv')
let ajv = new Ajv({allErrors: true})
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))
const {validator} = require('../../validator')

const validateBodyData = (schema) => (req, res, next) => {
  const {body: data} = req
  const {valid, errors} = validator({schema, data})
  if (!valid) {
    res.status(400).send(errors)
  } else {
    next()
  }
}

exports.validateBodyData = validateBodyData
