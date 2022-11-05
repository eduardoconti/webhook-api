import { ArgumentInvalidException } from '../exceptions';
import { DomainPrimitive, ValueObject } from '../contracts/value-object';

const methodsAccepts = ['GET', 'POST', 'DELETE', 'PATCH'];
export class Method extends ValueObject<string> {
  public constructor(method: string) {
    super({ value: method });
  }

  get value(): string {
    return this.props.value;
  }
  protected validate({ value }: DomainPrimitive<string>): void {
    if (!methodsAccepts.includes(value.toUpperCase())) {
      throw new ArgumentInvalidException('Incorrect method');
    }
  }
}
