import crypto from 'node:crypto';
import { knex } from '../database';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';

export async function transactionRoutes(app: FastifyInstance) {
  app.post('/', async (req, rep) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    });

    const { title, type, amount } = createTransactionBodySchema.parse(req.body);

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    });

    return rep.status(201).send();
  });
}
