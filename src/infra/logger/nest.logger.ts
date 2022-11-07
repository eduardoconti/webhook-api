import { Logger, LoggerService } from '@nestjs/common';
import { ILogger } from '@Domain/contracts';

export class NestLogger implements ILogger {
  private logger: LoggerService;

  constructor(context?: string) {
    this.logger = new Logger(context);
  }

  info<T>(message: T): void {
    this.logger.log(message);
  }

  error<T>(message: T): void {
    this.logger.error(message);
  }
}
