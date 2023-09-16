import { Gym, Prisma } from '@prisma/client';

export interface FindManyNearbyParams {
  userLatitude: number;
  userLongitude: number;
}

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  // findManyNearby(userLatitude: number, userLongitude: number): Promise<Gym[]>;
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>;
}
