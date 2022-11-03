import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Type,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { InvalidFields } from '../exception-filter';
import { Guard } from '@Domain/contracts';
import { InvalidRequestBodyException } from '../exceptions';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new InvalidRequestBodyException(this.buildInvalidFields(errors));
    }
    return value;
  }

  private toValidate(metatype: Type<any>): boolean {
    const types: Type<any>[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private buildInvalidFields(
    validationErrors: ValidationError[] = [],
  ): InvalidFields[] {
    let errors: InvalidFields[] = [];

    validationErrors.forEach((validationError: ValidationError): any => {
      const { property, constraints = {} } = validationError;
      if (!Guard.isEmpty(validationError.children)) {
        errors = [
          ...errors,
          ...this.buildInvalidFields(validationError.children),
        ];
      }
      Object.keys(constraints).forEach((prop: any) => {
        const invalidField = {
          field: property,
          reason: constraints[prop],
        };
        errors.push(invalidField);
      });
    });
    return errors;
  }
}
