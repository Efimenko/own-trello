const userValidationSchema = {
  add: {
    type: 'object',
    required: ['name', 'email', 'password'],
    additionalProperties: false,
    properties: {
      name: {
        type: 'string',
        minLength: 5,
        maxLength: 100,
      },
      email: {
        type: 'string',
        minLength: 5,
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
