import { GetUserMetricsUseCase } from '@/use-cases/get-user-metrics';
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';

export function makeGetUserMetricsUseCase() {
  const checkInsRespository = new PrismaCheckInsRepository();
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRespository);

  return getUserMetricsUseCase;
}
