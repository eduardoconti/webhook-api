import { Status } from '@Domain/enums';
import { BaseException } from '@Domain/exceptions';

/**
 * @class RepositoryException
 * @extends {BaseException}
 */
export class RepositoryException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
