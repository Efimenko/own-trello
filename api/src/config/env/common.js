const fs = require('fs')
const crypto = require('crypto')
const dotenv = require('dotenv')

const {logger} = require('../../logger')

const initializeEnvConfig = () => {
  const result = dotenv.config()

  if (result.error) {
    logger.error({err: result.error})
  } else {
    logger.info('.env file was successful initialized')
  }
}

const getEnvContent = (token) => {
  return `SECRET_KEY=${token}`
}

const writeToFile = ({filename, content}) => {
  try {
    fs.writeFileSync(filename, content)
    logger.info('.env file was succussful created')
  } catch (error) {
    logger.error({error}, 'During creating .env file error was occured')
  }
}

const generateToken = () => {
  try {
    const buffer = crypto.randomBytes(48)
    return buffer.toString('hex')
  } catch (error) {
    logger.error({error}, 'During generation token error was occured')
  }
}

exports.initializeEnvConfig = initializeEnvConfig
exports.getEnvContent = getEnvContent
exports.writeToFile = writeToFile
exports.generateToken = generateToken
