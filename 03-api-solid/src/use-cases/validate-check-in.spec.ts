import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { ValidateCheckInUseCase } from '@/use-cases/validate-check-in';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { LateCheckInValidationError } from '@/use-cases/errors/late-check-in-validation-error';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase; // sut = system under test

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    // mocking de datas do vitest
    // antes de cada teste, usar data ficticia
    vi.useFakeTimers();
  });

  afterEach(() => {
    // depois de cada teste, volta a usar data real
    vi.useRealTimers();
  });

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user_01',
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistant-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
