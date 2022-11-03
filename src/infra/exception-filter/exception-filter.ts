import {
  ArgumentsHost,
  ExceptionFilter as NestExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { AplicationProblem, HttpErrorResponse } from '../aplication-problem';

export abstract class ExceptionFilter implements NestExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const aplicationProblem = this.createAplicationProblem(exception);

    return HttpErrorResponse.send(response, aplicationProblem);
  }
  protected abstract createAplicationProblem(
    exception: unknown,
  ): AplicationProblem;
}
