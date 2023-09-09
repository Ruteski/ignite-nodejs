import { userRegister } from '@/http/controllers/register';
import { FastifyInstance } from 'fastify';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', userRegister);
}
