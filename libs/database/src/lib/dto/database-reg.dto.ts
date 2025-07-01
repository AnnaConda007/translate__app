import { IsEmail, IsNumber, IsString } from 'class-validator';

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

export class RemoveTextRegDto {
  @IsString()
  title!: string;
}


export class RenaimeTextRegDto {
  @IsString()
  title!: string;

    @IsString()
  newTitle!: string;
}



export class AddWordRegDto {
  @IsString()
  source!: string;

  @IsString()
  translation!: string;
}

export class removeFromDictionaryResDto {
  @IsString()
  word!: string;
}

export class updateDictionaryProgressResDto {
  @IsNumber()
  progress!: number;

    @IsString()
  word!: string;
}

export class updateLearnedStatusResDto {
  @IsNumber()
  isLearned!: boolean;
    @IsString()
  word!: string;
}

 export type RemoveTextPayload = RemoveTextRegDto & { userId: string };
 export type RenaimeTextPayload = RenaimeTextRegDto & { userId: string };
 export type RemoveFromDictionaryobPayload = removeFromDictionaryResDto & { userId: string };
 export type updateLearnedStatusPayload = updateLearnedStatusResDto & { userId: string };
export type updateDictionaryProgressPayload = updateDictionaryProgressResDto & { userId: string };
export type AddWordJobPayload = AddWordRegDto & { userId: string };
export type NewUserRegPayload = NewUserRegDto & { userId: string };
 export type AddUserTextRegPayload = AddUserTextRegDto & { userId: string };

