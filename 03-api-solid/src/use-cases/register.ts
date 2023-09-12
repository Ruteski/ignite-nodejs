// use-cases pode ser chamado de services tb

import { hash } from 'bcryptjs';
import { UsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

// SOLID -
// D - Dependency Inversion Principle

export class UserRegisterUserCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
