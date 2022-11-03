import { Catch } from '@nestjs/common';
import { BaseException } from '@Domain/exceptions';
import { AplicationProblem } from '../aplication-problem';
import { ExceptionFilter } from './exception-filter';

export type InvalidFields = {
  field: string;
  reason: string;
};
@Catch(BaseException)
export class BaseExceptionFilter extends ExceptionFilter {
  protected createAplicationProblem(exception: BaseException) {
    return AplicationProblem.createFromBaseException(exception);
  }
}
