import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from '@/infra/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //   logger: false,
  });

  // o app.get busca services que eu criei, poderia ser o prisma.service
  // const configService = app.get<ConfigService<Env>>(ConfigService);
  const envService = app.get(EnvService);
  const port = envService.get('PORT');

  await app.listen(port);
}
bootstrap();
