const bunyan = require('bunyan')

const conf = {
  name: 'trello-parcel',
  streams: [{stream: process.stdout, level: 'info'}],
  serializers: {req: bunyan.stdSerializers.req, res: bunyan.stdSerializers.res},
}
const logger = bunyan.createLogger(conf)

exports.logger = logger
