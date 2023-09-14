import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UserRegisterUserCase } from '@/use-cases/register';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

export async function userRegister(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  const userRepository = new PrismaUsersRepository();
  const userRegisterUseCase = new UserRegisterUserCase(userRepository);

  try {
    await userRegisterUseCase.execute({
      name,
      email,
      password,
    });
  } catch (err: any) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  reply.status(201).send();
}
