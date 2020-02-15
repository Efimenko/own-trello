const fs = require('fs')
const {initializeEnv} = require('_src/config')
const {
  writeToFile,
  initializeEnvConfig,
  generateToken,
  getEnvContent,
} = require('_src/config/env/common')

jest.mock('_src/config/env/common')
jest.mock('fs')

beforeEach(() => {
  jest.resetAllMocks()
})

describe('initializeEnv function', () => {
  it('Should add constants from .env file to process.env', () => {
    initializeEnv()
    expect(initializeEnvConfig).toHaveBeenCalledTimes(1)
  })

  it('Should create new .env file when it does not exists', () => {
    fs.existsSync.mockReturnValue(false)
    initializeEnv()

    expect(generateToken).toHaveBeenCalledTimes(1)
    expect(getEnvContent).toHaveBeenCalledTimes(1)
    expect(writeToFile).toHaveBeenCalledTimes(1)
  })
})
