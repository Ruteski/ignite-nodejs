import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { CheckInUseCase } from '@/use-cases/checkin';
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';

export function makeCheckInUseCase() {
  const checkInsRespository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  const checkInUseCase = new CheckInUseCase(
    checkInsRespository,
    gymsRepository,
  );

  return checkInUseCase;
}
