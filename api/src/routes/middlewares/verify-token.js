const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization')
  const token = authHeader && authHeader.split(' ')[1]
  if (!authHeader || !token) return res.status(401).send('Unauthorized')
  try {
    jwt.verify(token, process.env.SECRET_KEY)
    const {_id} = jwt.decode(token)
    req.userId = _id
    next()
  } catch (error) {
    return res.status(401).send(error)
  }
}

module.exports = verifyToken
