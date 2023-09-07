import fastify from 'fastify';
import cookie from '@fastify/cookie';
import { env } from './env';
import { transactionRoutes } from './routes/transactions';

const app = fastify();

app.register(cookie);

// o fastify roda os plugin em ordem que foram registrados, cuidar com isso
app.register(transactionRoutes, {
  prefix: 'transactions',
});

app
  .listen({
    port: Number(env.PORT),
  })
  .then(() => {
    console.log('HTTP Server running in port 3333!');
  });
