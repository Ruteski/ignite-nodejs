import { prisma } from '@/lib/prisma';
// import { User } from '@prisma/client';
import { Prisma } from '@prisma/client';

export class PrismaUsersRepository {
  // async create(data: User) {
  //   const { name, email, password_hash } = data;
  //
  //   await prisma.user.create({
  //     data: {
  //       name,
  //       email,
  //       password_hash,
  //     },
  //   });
  // }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
