import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { FetchUserCheckInsHistoryUseCase } from '@/use-cases/fetch-user-check-ins-history';

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRespository = new PrismaCheckInsRepository();
  const fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
    checkInsRespository,
  );

  return fetchUserCheckInsHistoryUseCase;
}
