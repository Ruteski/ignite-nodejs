import 'dotenv/config.js';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('production'),
  PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Invalid environmnet variables!', _env.error.format());

  throw new Error('Invalid environmnet variables!');
}

export const env = _env.data;
