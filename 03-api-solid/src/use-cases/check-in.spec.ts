import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from '@/use-cases/checkin';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase; // sut = system under test

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it('should be able check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
