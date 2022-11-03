import { NestFactory } from '@nestjs/core';

import { AppModule } from './main/app.module';
import { ValidationPipe } from './infra/pipes/validation.pipe';
import { WinstonLogger } from './infra/logger';
import {
  HttpExceptionFilter,
  BaseExceptionFilter,
  UnknownExceptionFilter,
} from './infra/exception-filter';

async function bootstrap() {
  const logger = new WinstonLogger('NestApplication');
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new BaseExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new UnknownExceptionFilter());
  app.enableCors();

  await app.listen(3000);

  logger.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
