import { Inject, Injectable } from '@nestjs/common';
import { ICreateNewUserTableProvider } from './interfaces/auth-provider.interface';
import { IDictionaryRepository } from './interfaces/dictionary-provider.interface';
import { ILibraryRepository } from './interfaces/texts-provider.interface';
import { AddWordJobPayload, NewUserRegPayload } from './dto/database-reg.dto';

import { AddUserTextRegPayload } from './dto/database-reg.dto';
 import { UserText } from './entities/user_text-entry.entity';
import { User } from './entities/users-entry.entity';
import { UserWord } from './entities/user_word-entry.entity';
@Injectable()
export class DataBaseService {
  constructor(
    @Inject('ICreateNewUserTableProvider') private readonly userRepo: ICreateNewUserTableProvider,

    @Inject('IDictionaryRepository') private readonly dictionaryRepo: IDictionaryRepository,

    @Inject('ILibraryRepository') private readonly textRepo: ILibraryRepository
  ) {}


  async createNewUserTable(payload:NewUserRegPayload): Promise<User> {
   return await this.userRepo.createNewUserTable(payload);
   
  }

  async userLibraryReplenish(payload:AddUserTextRegPayload) :Promise<UserText> {
       return await this.textRepo.userLibraryReplenish(payload);
     
  }
  async dictionaryReplenish(payload:AddWordJobPayload) : Promise<UserWord>{
      const result = await this.dictionaryRepo.dictionaryReplenish(payload);
      return result;
  }

  
}
