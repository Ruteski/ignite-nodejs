import { userRegister } from '@/http/controllers/register';
import { FastifyInstance } from 'fastify';
import { authenticate } from '@/http/controllers/authenticate';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', userRegister);
  app.post('/sessions', authenticate);
}
