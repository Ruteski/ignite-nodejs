import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from '@/use-cases/authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase; // sut = system under test

beforeEach(() => {
  usersRepository = new InMemoryUsersRepository();
  sut = new AuthenticateUseCase(usersRepository); //  sut = system under test
});

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      email: 'jhondoe@email.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'jhondoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password_hash: await hash('123456', 6),
    });

    expect(() =>
      sut.execute({
        email: 'jhondoe@email.com',
        password: '1234566',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
