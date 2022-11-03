import { IsString, MinLength } from 'class-validator';

export class CreateWebhookDto {
  @IsString()
  name!: string;

  @IsString()
  @MinLength(10)
  description!: string;
}
