import fastify from 'fastify';
import { knex } from './database';
import crypto from 'node:crypto';
import { env } from './env';

const app = fastify();

app.get('/hello', async () => {
  // const transaction = await knex('transactions')
  //   .insert({
  //     id: crypto.randomUUID(),
  //     title: 'Transação de teste 2',
  //     amount: 3200,
  //   })
  //   .returning('*');

  // const transaction = await knex('transactions').select('*');

  const transaction = await knex('transactions').where('amount', 3200).select('*');

  return transaction;
});

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server running in port 3333!');
  });
