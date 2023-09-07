// npx knex -h
// yarn knex -- -h
// yarn knex -- migrate:make

import 'dotenv/config';
import { knex as setupKnex, Knex } from 'knex';

console.log(process.env);

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL env not found.');
}

export const configKnex: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: process.env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: process.env.DATABASE_MIGRATIONS,
  },
};

export const knex = setupKnex(configKnex);
