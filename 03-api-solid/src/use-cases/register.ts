// use-cases pode ser chamado de services tb

import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

// SOLID -
// D - Dependency Inversion Principle

export class UserRegisterUserCase {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.');
    }

    const password_hash = await hash(password, 6);

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
