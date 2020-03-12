const {validator} = require('../../validator')

const validateBodyData = (schema) => (req, res, next) => {
  const {body: data} = req
  const {valid, errors} = validator({schema, data})
  if (!valid) {
    return res.status(400).send(errors)
  } else {
    next()
  }
}

exports.validateBodyData = validateBodyData
