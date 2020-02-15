const dotenv = require('dotenv')
const fs = require('fs')
const {
  initializeEnvConfig,
  getEnvContent,
  writeToFile,
  generateToken,
} = require('_src/config/env/common')

jest.mock('dotenv', () => ({
  config: jest.fn(() => ({
    error: false,
  })),
}))

jest.mock('fs', () => ({
  writeFileSync: jest.fn(),
}))

describe('config/env/common', () => {
  it('should invoke dotenv config function', () => {
    initializeEnvConfig()
    expect(dotenv.config).toHaveBeenCalledTimes(1)
  })

  it('should return corrent content from getEnvContent function', () => {
    expect(getEnvContent('token')).toBe('SECRET_KEY=token')
  })

  it('should invoke fs.writeFileSync function', () => {
    writeToFile({filename: '.env', content: 'some content'})
    expect(fs.writeFileSync).toBeCalledWith('.env', 'some content')
  })

  it('should not return undefinde', () => {
    expect(generateToken()).not.toBeUndefined()
  })
})
