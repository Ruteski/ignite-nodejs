import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { CheckIn, Prisma } from '@prisma/client';
import { undefined } from 'zod';
import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';

export class PrismaCheckInsRepository implements CheckInsRepository {
  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });

    return checkIn;
  }

  async findByUserIdOnDate(userID: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    // utilizando o findFirst pq o campo no where não é um campo unico e o retorno msm assim é unico
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userID,
        created_at: {
          gte: startOfTheDay.toDate(), // maior ou igual
          lte: endOfTheDay.toDate(), // menor ou igual
        },
      },
    });

    return checkIn;
  }

  async findManyByUserID(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20, // qtos itens trazer - limit, 20 por pagina
      skip: (page - 1) * 20,
    });

    return checkIns;
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });

    return checkIn;
  }
}
