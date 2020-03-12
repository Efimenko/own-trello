const mongoose = require('mongoose')

const {logger} = require('../../logger')

const connectToDB = () => {
  logger.info('Start connection to MongoDB')
  mongoose
    .connect('mongodb://localhost:27017/trello', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .catch((error) => logger.error({error}, 'Can not connect to MongoDB'))

  mongoose.connection.once('open', () => logger.info('Connected to MongoDB'))
}

exports.connectToDB = connectToDB
