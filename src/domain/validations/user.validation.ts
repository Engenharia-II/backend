export const RegisterSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      minLength: 1
    },
    name: {
      type: 'string',
      minLength: 1
    }
  }
};
