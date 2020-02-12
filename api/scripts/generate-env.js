const fs = require('fs')
const crypto = require('crypto')

const createEnvContent = (token) => {
  return `SECRET_KEY=${token}`
}

const writeToFile = (token) => {
  fs.writeFile('.env', createEnvContent(token), function(err) {
    if (err) {
      return console.log('During creating .env file error was occured: ', err)
    }
    console.log('.env was succussful created')
  })
}

const generateTokenAndWriteToFile = () => {
  crypto.randomBytes(48, function(err, buffer) {
    if (err) {
      return console.log('During generation token error was occured: ', err)
    }
    writeToFile(buffer.toString('hex'))
  })
}

generateTokenAndWriteToFile()
