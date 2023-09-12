import { expect, describe, it } from 'vitest';
import { UserRegisterUserCase } from '@/use-cases/register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new UserRegisterUserCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new UserRegisterUserCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should be not able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new UserRegisterUserCase(usersRepository);

    const email = 'jhondoe@email.com';

    await registerUseCase.execute({
      name: 'Jhon Doe',
      email,
      password: '123456',
    });

    // espero que promise retorne um reject e que ela seja uma instancia do tipo UserAlreadyExistsError
    expect(() =>
      registerUseCase.execute({
        name: 'Jhon Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
