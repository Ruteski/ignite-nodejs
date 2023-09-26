import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { PrismaService } from './prisma/prisma.service';
import { envSchema } from './env/env';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@/infra/http/http.module';
import { EnvModule } from '@/infra/env/env.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    EnvModule,
  ],
  controllers: [],
  // providers: [PrismaService],
})
export class AppModule {}
