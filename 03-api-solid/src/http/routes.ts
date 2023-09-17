import { userRegister } from '@/http/controllers/register';
import { FastifyInstance } from 'fastify';
import { authenticate } from '@/http/controllers/authenticate';
import { profile } from '@/http/controllers/profile';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', userRegister);

  app.post('/sessions', authenticate);

  /* Routes Authenticated */
  app.get('/me', profile);
}
