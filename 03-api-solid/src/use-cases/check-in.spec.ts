import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from '@/use-cases/checkin';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase; // sut = system under test

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);

    // mocking de datas do vitest
    // antes de cada teste, usar data ficticia
    vi.useFakeTimers();
  });

  afterEach(() => {
    // depois de cada teste, volta a usar data real
    vi.useRealTimers();
  });

  it('should be able check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  /*        FLUXO TDD
   estado red - erro no teste
   estado green - teste passa
   estado refactor - melhorar o codigo
   ************
   Red (Vermelho): nesta fase, o desenvolvedor escreve um teste que deve falhar, ou seja, ele garante que o teste não passará sem implementar o código necessário.
   Green (Verde): aqui, o desenvolvedor escreve a quantidade mínima de código necessária para fazer o teste passar.
   Refactor (Refatorar): após o teste passar, o desenvolvedor refatora o código para melhorar a qualidade, sem alterar seu comportamento.
  */

  it('should not be able to check in twice in the same day', async () => {
    // cria uma data mockada
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    });

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice but in different days', async () => {
    // cria uma data mockada
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
