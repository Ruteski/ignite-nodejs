// npx knex -h
// yarn knex -- -h
// yarn knex -- migrate:make

import { knex as setupKnex, Knex } from 'knex';
import { env } from './env';

// console.log(process.env);

export const configKnex: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === 'sqlite'
      ? {
          filename: env.DATABASE_URL,
        }
      : env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: env.DATABASE_MIGRATIONS,
  },
};

export const knex = setupKnex(configKnex);
