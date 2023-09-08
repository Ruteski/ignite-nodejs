import crypto from 'node:crypto';
import { knex } from '../database';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function transactionRoutes(app: FastifyInstance) {
  // executa em qualquer rota chamada aqui dentro
  app.addHook('preHandler', async (req) => {
    console.log(`[${req.method}] ${req.url}`);
  });

  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req) => {
      const { sessionId } = req.cookies;

      const transactions = await knex('transactions').where('session_id', sessionId).select();

      return { transactions };
    },
  );

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req) => {
      const { sessionId } = req.cookies;

      const getTransactionParamSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getTransactionParamSchema.parse(req.params);

      // const transaction = await knex('transactions')
      //   .select()
      //   .where({
      //     id,
      //   })
      //   .first();

      // const transaction = await knex('transactions').where('id', id).andWhere('session_id', sessionId).first();
      const transaction = await knex('transactions').where({ session_id: sessionId, id }).first();

      return { transaction };
    },
  );

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req) => {
      const { sessionId } = req.cookies;

      const summary = await knex('transactions').where('session_id', sessionId).sum('amount', { as: 'amount' }).first();

      return { summary };
    },
  );

  app.post('/', async (req, rep) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    });

    const { title, type, amount } = createTransactionBodySchema.parse(req.body);

    let sessionId = req.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      rep.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      });
    }

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    });

    return rep.status(201).send();
  });
}
