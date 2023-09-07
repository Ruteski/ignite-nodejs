import fastify from 'fastify';
import cookie from '@fastify/cookie';
import { env } from './env';
import { transactionRoutes } from './routes/transactions';

const app = fastify();

app.register(cookie);

// executa em qualquer rota chamada aqui dentro
app.addHook('preHandler', async (req, rep) => {
  console.log(`Executando de modo global para todas as rotas da aplicacao [${req.method}] ${req.url}`);
});

// o fastify roda os plugin em ordem que foram registrados, cuidar com isso
app.register(transactionRoutes, {
  prefix: 'transactions',
});

app.get('/hello', async () => {
  return 'Hello World';
});

app
  .listen({
    port: Number(env.PORT),
  })
  .then(() => {
    console.log('HTTP Server running in port 3333!');
  });
