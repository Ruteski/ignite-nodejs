import crypto from 'node:crypto';
import { knex } from '../database';
import { FastifyInstance } from 'fastify';

export async function transactionRoutes(app: FastifyInstance) {
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
}
