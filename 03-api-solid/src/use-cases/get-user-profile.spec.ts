import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase; // sut = system under test

beforeEach(() => {
  usersRepository = new InMemoryUsersRepository();
  sut = new GetUserProfileUseCase(usersRepository); //  sut = system under test
});

describe('Get User Profile Use Case', () => {
  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual('Jhon Doe');
  });

  it('should be able to get user profile with wrong id', async () => {
    expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
