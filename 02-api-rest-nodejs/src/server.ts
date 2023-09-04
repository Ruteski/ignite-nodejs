import fastify from 'fastify';
import { knex } from './database';
import crypto from 'node:crypto';

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

  const transaction = await knex('transactions').where('amount', 1000).select('*');

  return transaction;
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server running in port 3333!');
  });
