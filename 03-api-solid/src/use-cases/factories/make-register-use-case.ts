import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UserRegisterUserCase } from '@/use-cases/register';

export function makeRegisterUseCase() {
  const userRepository = new PrismaUsersRepository();
  const userRegisterUseCase = new UserRegisterUserCase(userRepository);

  return userRegisterUseCase;
}
