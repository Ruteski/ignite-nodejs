import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middlewares/verify-jwt';

export async function gymsRoutes(app: FastifyInstance) {
  // todas as rotas dentro desse arquivo vao chamar o middleware para verificar se esta autenticado
  app.addHook('onRequest', verifyJwt);
}
