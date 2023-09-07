import { expect, test, beforeAll, afterAll, describe, it, beforeEach } from 'vitest';
import { execSync } from 'node:child_process';
import request from 'supertest';
import { app } from '../app';
import { execFileSync } from 'child_process';

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    // executa comandos no terminal por dentro da aplicacao
    execSync('yarn knex migrate:rollback --all');
    execSync('yarn knex migrate:latest');
  });

  it('should be able to create a new transaction', async () => {
    // const response = await request(app.server).post('/transactions').send({
    //   title: 'new transaction',
    //   amount: 5000,
    //   type: 'credit',
    // });
    //
    // expect(response.statusCode).toEqual(201);

    await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201);
  });

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server).post('/transactions').send({
      title: 'new transaction',
      amount: 5000,
      type: 'credit',
    });

    const cookies = createTransactionResponse.get('Set-Cookie');

    const listTransactionsResponse = await request(app.server).get('/transactions').set('Cookie', cookies).expect(200);

    // expect(listTransactionsResponse.body).toEqual([
    //   {
    //     id: expect.any(String),
    //   },
    // ]);

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'new transaction',
        amount: 5000,
      }),
    ]);
  });
});
