const {logger} = require('./config')
const {pick, omit} = require('../utils')

const reqResLogger = (req, res, next) => {
  const oldWrite = res.write
  const oldEnd = res.end
  const chunks = []
  const reqHeadersKeys = ['content-type', 'authorization']
  const resHeadersKeys = ['content-type', 'authorization']
  const reqHeaders = pick(reqHeadersKeys)(req.headers)

  res.write = (...restArgs) => {
    chunks.push(Buffer.from(restArgs[0]))
    oldWrite.apply(res, restArgs)
  }
  res.end = (...restArgs) => {
    const resHeaders = pick(resHeadersKeys)(res.getHeaders())
    if (restArgs[0]) chunks.push(Buffer.from(restArgs[0]))

    const body = Buffer.concat(chunks).toString('utf-8')
    logger.info({
      type: 'Response',
      url: req.originalUrl,
      headers: resHeaders,
      body,
    })

    oldEnd.apply(res, restArgs)
  }

  logger.info({
    type: 'Request',
    method: req.method,
    url: req.originalUrl,
    headers: reqHeaders,
    body: omit(['password'])(req.body),
  })

  next()
}

exports.reqResLogger = reqResLogger
