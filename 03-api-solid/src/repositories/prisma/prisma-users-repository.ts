import { prisma } from '@/lib/prisma';
// import { User } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { UsersRepository } from '@/repositories/users-repository';

export class PrismaUsersRepository implements UsersRepository {
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

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
