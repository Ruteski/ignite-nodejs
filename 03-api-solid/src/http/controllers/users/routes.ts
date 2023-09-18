import { userRegister } from './register';
import { FastifyInstance } from 'fastify';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { verifyJwt } from '@/http/middlewares/verify-jwt';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', userRegister);

  app.post('/sessions', authenticate);

  /* Routes Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile);
}
