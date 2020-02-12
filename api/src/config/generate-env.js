const fs = require('fs')
const crypto = require('crypto')
const {logger} = require('../logger')

const createEnvContent = (token) => {
  return `SECRET_KEY=${token}`
}

const writeToFile = ({token, callback}) => {
  fs.writeFile('.env', createEnvContent(token), function(err) {
    if (err) {
      return logger.error({err}, 'During creating .env file error was occured')
    }
    logger.info('.env file was succussful created')
    callback()
  })
}

const generateTokenAndWriteToFile = () =>
  new Promise((res) => {
    crypto.randomBytes(48, function(err, buffer) {
      if (err) {
        return logger.error({err}, 'During generation token error was occured')
      }
      writeToFile({token: buffer.toString('hex'), callback: res})
    })
  })

exports.generateTokenAndWriteToFile = generateTokenAndWriteToFile
