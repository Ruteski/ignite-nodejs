import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //   logger: false,
  });

  // o app.get busca services que eu criei, poderia ser o prisma.service
  // const configService = app.get<ConfigService<Env>>(ConfigService);
  const configService: ConfigService<Env, true> = app.get(ConfigService);
  const port = configService.get('PORT', { infer: true });

  await app.listen(port);
}
bootstrap();
