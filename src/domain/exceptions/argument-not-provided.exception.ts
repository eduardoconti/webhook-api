import { Status } from '../enums';
import { BaseException } from './base.exception';

/**
 * Used to indicate that an argument was not provided (is empty object/array, null of undefined).
 *
 * @class ArgumentNotProvidedException
 * @extends {ExceptionBase}
 */
export class ArgumentNotProvidedException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
