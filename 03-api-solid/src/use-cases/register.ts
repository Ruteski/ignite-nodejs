// use-cases pode ser chamado de services tb

import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function userRegisterUseCase({ name, email, password }: RegisterUseCaseRequest) {
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.');
  }

  const password_hash = await hash(password, 6);

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
}
