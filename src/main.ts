import { NestFactory } from '@nestjs/core';

import { AppModule } from './main/app.module';
import { ValidationPipe } from './infra/pipes/validation.pipe';
import { NestLogger } from './infra/logger';
import {
  HttpExceptionFilter,
  BaseExceptionFilter,
} from './infra/exception-filter';

async function bootstrap() {
  const logger = new NestLogger('NestApplication');
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new BaseExceptionFilter(logger));
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.enableCors();

  await app.listen(process.env.PORT || 3000);

  logger.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
