import { ILogger } from '@/domain/contracts';
import {
  createLogger,
  format,
  transports,
  Logger as LoggerOptions,
} from 'winston';

export class WinstonLogger implements ILogger {
  private readonly logger: LoggerOptions;
  private readonly context?: string;

  constructor(context?: string) {
    const { combine, timestamp, json } = format;
    this.context = context;

    this.logger = createLogger({
      exceptionHandlers: [new transports.Console()],
      format: combine(
        timestamp({
          format: 'DD-MM-YYYY HH:mm:ss',
        }),
        json(),
      ),
      transports: [new transports.Console()],
    });
  }

  info(message: string, data?: any): void {
    this.logger.info(message, { data, context: this.context });
  }

  error(message: string, data?: any): void {
    this.logger.error(message, { data, context: this.context });
  }
}
