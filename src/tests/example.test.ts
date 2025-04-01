import 'jest';
import { app } from '../index';

describe('Example', () => {
  afterAll(async () => {
    await app.app.close();
  });

  it('should not create a user', async () => {
    const response = await app.app.inject({
      method: 'POST',
      url: '/example/user/create',
      payload: {
        email: 'test.com',
        name: 'jon doe'
      }
    });

    expect(response.statusCode).toBe(400);
  });

  it('should create a user', async () => {
    const response = await app.app.inject({
      method: 'POST',
      url: '/example/user/create',
      payload: {
        email: 'test@testemail.com',
        name: 'jon doe'
      }
    });

    expect(response.statusCode).toBe(200);
  });
});
