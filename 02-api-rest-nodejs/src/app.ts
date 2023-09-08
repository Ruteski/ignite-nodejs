import fastify from 'fastify';
import cookie from '@fastify/cookie';
import { transactionRoutes } from './routes/transactions';

export const app = fastify();

app.register(cookie);

// executa em qualquer rota chamada aqui dentro
app.addHook('preHandler', async (req) => {
  console.log(`Executando de modo global para todas as rotas da aplicacao [${req.method}] ${req.url}`);
});

// o fastify roda os plugin em ordem que foram registrados, cuidar com isso
app.register(transactionRoutes, {
  prefix: 'transactions',
});

app.get('/hello', async () => {
  return 'Hello World';
});
