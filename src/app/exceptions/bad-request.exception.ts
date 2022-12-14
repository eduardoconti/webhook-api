import { Status } from '@Domain/enums';
import { BaseException } from '@Domain/exceptions';

/**
 * Used to indicate that an argument was not provided (is empty object/array, null of undefined).
 *
 * @class BadRequestException
 * @extends {ExceptionBase}
 */
export class BadRequestException extends BaseException {
  readonly code = Status.INVALID_REQUEST;
}
