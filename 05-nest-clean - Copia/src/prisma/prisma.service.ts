import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['warn', 'error'],
    });
  }

  onModuleDestroy(): any {
    return this.$connect(); // conecta com o prisma
  }

  onModuleInit(): any {
    return this.$disconnect(); // desconecta do prisma
  }
}
