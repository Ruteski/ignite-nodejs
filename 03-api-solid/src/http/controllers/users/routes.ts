import { userRegister } from './register';
import { FastifyInstance } from 'fastify';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { refresh } from '@/http/controllers/users/refresh';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', userRegister);
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refresh);

  /* Routes Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile);
}
