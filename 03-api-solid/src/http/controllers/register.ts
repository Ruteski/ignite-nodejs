import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { userRegisterUseCase } from '@/use-cases/register';

export async function userRegister(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    await userRegisterUseCase({
      name,
      email,
      password,
    });
  } catch (err: any) {
    return reply.status(409).send({
      message: err.message,
    });
  }

  reply.status(201).send();
}
