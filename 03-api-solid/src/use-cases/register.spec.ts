import { expect, describe, it, beforeEach } from 'vitest';
import { UserRegisterUserCase } from '@/use-cases/register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

let usersRepository: InMemoryUsersRepository;
let sut: UserRegisterUserCase; // sut = system under test

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UserRegisterUserCase(usersRepository);
  });

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should be not able to register with same email twice', async () => {
    const email = 'jhondoe@email.com';

    await sut.execute({
      name: 'Jhon Doe',
      email,
      password: '123456',
    });

    // espero que promise retorne um reject e que ela seja uma instancia do tipo UserAlreadyExistsError
    await expect(() =>
      sut.execute({
        name: 'Jhon Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
