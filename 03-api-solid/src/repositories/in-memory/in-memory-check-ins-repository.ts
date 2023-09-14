import { CheckIn, Prisma } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/prisma/check-ins-repository';
import { randomUUID } from 'node:crypto';
import { undefined } from 'zod';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }

  async findByUserIdOnDate(userID: string, date: Date) {
    const checkInOnSameDate = this.items.find(
      (checkIn) => checkIn.user_id === userID,
    );

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }
}
