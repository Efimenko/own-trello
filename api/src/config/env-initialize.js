const fs = require('fs')
const dotenv = require('dotenv')
const {generateTokenAndWriteToFile} = require('./generate-env')
const {logger} = require('../logger')

const envInitialize = () => {
  const path = `${process.cwd()}/.env`
  try {
    if (!fs.existsSync(path)) {
      logger.info("Can't find .env file localy. Start creating file...")
      generateTokenAndWriteToFile().then(() => {
        const result = dotenv.config()

        if (result.error) {
          logger.error({err: result.error})
        } else {
          logger.info('.env file was successful initialized')
        }
      })
    }
  } catch (err) {
    logger.error({err})
  }
}

exports.envInitialize = envInitialize
