module.exports = {
  testEnvironment: 'node',
  setupFiles: ['./src/tests/setup'],
  moduleNameMapper: {
    '^_src(.*)$': '<rootDir>/src$1',
  },
}
