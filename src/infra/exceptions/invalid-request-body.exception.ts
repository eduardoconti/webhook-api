import { InvalidFields } from '@/infra/exception-filter';
import { Status } from '@Domain/enums';
import { BaseException } from '@Domain/exceptions';

/**
 * @class InvalidRequestBodyException
 * @extends {BaseException}
 */
export class InvalidRequestBodyException extends BaseException {
  readonly code = Status.INVALID_REQUEST;

  constructor(private readonly _invalidFields: InvalidFields[]) {
    super('Some fields are in wrong format');
  }

  get invalidFields() {
    return this._invalidFields;
  }
}
