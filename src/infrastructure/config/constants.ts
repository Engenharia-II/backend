const config = {
  app: { domain: '0.0.0.0', port: 3333, kind: 'developement' },
  jwt: { secret: '1q@w3e4r5t6y', expires: '24h' },
  cookie: {
    secret: '1q@w3e4r5t6y',
    expires: '24h',
    cookieName: 'token'
  }
};

export const USER_DEFAULT_ROLE_ID = 1;

export default config;
