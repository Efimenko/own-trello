const fs = require('fs')
const {
  initializeEnvConfig,
  generateToken,
  getEnvContent,
  writeToFile,
} = require('./common')
const {logger} = require('../../logger')

const ENV_FILE_NAME = '.env'

const createEnvFile = function() {
  const token = generateToken()
  const envFileContent = getEnvContent(token)
  writeToFile({filename: ENV_FILE_NAME, content: envFileContent})
}

const initializeEnv = function() {
  const path = `${process.cwd()}/${ENV_FILE_NAME}`
  try {
    if (!fs.existsSync(path)) {
      logger.info("Can't find .env file localy. Start creating file...")
      createEnvFile()
    }
    initializeEnvConfig()
  } catch (err) {
    logger.error({err})
  }
}
exports.initializeEnv = initializeEnv
