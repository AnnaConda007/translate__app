import { IsString } from 'class-validator';

export class TranslateRegDto {
  @IsString()
  text!: string;
}
