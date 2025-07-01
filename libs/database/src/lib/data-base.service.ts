import { Inject, Injectable } from '@nestjs/common';
import { IAuthProvider } from './interfaces/auth-provider.interface';
import { IDictionaryRepository } from './interfaces/dictionary-provider.interface';
import { ITextsRepository } from './interfaces/texts-provider.interface';
import { AddWordJobPayload, NewUserRegPayload } from './dto/database-reg.dto';

import { AddUserTextRegPayload } from './dto/database-reg.dto';
 import { UserText } from './entities/user_text-entry.entity';
import { User } from './entities/users-entry.entity';
import { UserWord } from './entities/user_word-entry.entity';
@Injectable()
export class DataBaseService {
  constructor(
    @Inject('IAuthProvider') private readonly authRepo: IAuthProvider,

    @Inject('IDictionaryRepository') private readonly dictionaryRepo: IDictionaryRepository,

    @Inject('ITextsRepository') private readonly textRepo: ITextsRepository
  ) {}

  async addText(payload:AddUserTextRegPayload) :Promise<UserText> {
       return await this.textRepo.addText(payload);
     
  }
  async addWord(payload:AddWordJobPayload) : Promise<UserWord>{
      const result = await this.dictionaryRepo.addWord(payload);
      return result;
  }

  async auth(payload:NewUserRegPayload): Promise<User> {
   return await this.authRepo.addNewUser(payload);
   
  }
}
