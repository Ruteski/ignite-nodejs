import { expect, describe, it } from 'vitest';
import { UserRegisterUserCase } from '@/use-cases/register';
import { compare } from 'bcryptjs';

describe('Register uUse Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new UserRegisterUserCase({
      async findByEmail(email: string) {
        return null;
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
          updated_at: new Date(),
        };
      },
    });

    const { user } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
