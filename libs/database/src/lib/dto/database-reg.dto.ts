import { IsEmail, IsString } from 'class-validator';

  export class NewUserRegDto {
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;
}

export class AddUserTextRegDto {
  @IsString()
  title!: string;

  @IsString()
  content!: string;
}


export class AddWordRegDto {
  @IsString()
  source!: string;

  @IsString()
  translation!: string;
}

 

export type AddWordJobPayload = AddWordRegDto & { userId: string };
export type NewUserRegPayload = NewUserRegDto & { userId: string };
 export type AddUserTextRegPayload = AddUserTextRegDto & { userId: string };

