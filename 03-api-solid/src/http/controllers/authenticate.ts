import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateUseCase } from '@/use-cases/authenticate';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticatodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticatodySchema.parse(request.body);

  const userRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(userRepository);

  try {
    await authenticateUseCase.execute({
      email,
      password,
    });
  } catch (err: any) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  reply.status(200).send();
}
