import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from '@/use-cases/create-gym';
import { Decimal } from '@prisma/client/runtime/library';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase; // sut = system under test

describe('CreateGym  Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('should be able create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Academy',
      description: '',
      phone: '',
      latitude: -25.5443331,
      longitude: -49.1727187,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
