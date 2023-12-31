import {
  FindManyNearbyParams,
  GymsRepository,
} from '@/repositories/gyms-repository';
import { Gym, Prisma } from '@prisma/client';
import { undefined } from 'zod';
import { prisma } from '@/lib/prisma';

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });

    return gym;
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }

  async findManyNearby({ userLatitude, userLongitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * 
        FROM gyms
       WHERE ( 6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * 
                cos( radians( longitude ) - radians(${userLongitude}) ) + sin( radians(${userLatitude}) ) * 
                sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20, // quero 20 registros
      skip: (page - 1) * 20, // a partir do registro X
    });

    return gyms;
  }
}
