const userValidationSchema = {
  add: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: {
        type: 'string',
        maxLength: 100,
      },
      email: {
        type: 'string',
        minLength: 6,
        maxLength: 256,
        format: 'email',
      },
      password: {
        type: 'string',
        minLength: 6,
        maxLength: 256,
      },
    },
  },
}

exports.userValidationSchema = userValidationSchema
