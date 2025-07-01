import { Inject, Injectable } from '@nestjs/common';
import { ICreateNewUserTableProvider } from './interfaces/user-provider.interface';
import { IDictionaryRepository } from './interfaces/dictionary-provider.interface';
import { ILibraryRepository } from './interfaces/library-provider.interface';
import { AddWordJobPayload, GetUserIdPayload, NewUserRegPayload ,RemoveFromDictionaryobPayload, RemoveTextPayload, RenaimeTextPayload, updateDictionaryProgressPayload, updateLearnedStatusPayload} from './dto/database-reg.dto';

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

    async removeTextFromUserLibrary(payload:RemoveTextPayload) :Promise<void> {
         await this.textRepo.removeTextFromUserLibrary(payload);
     
  }

    async renameTextInLibrary(payload:RenaimeTextPayload) :Promise<void> {
         await this.textRepo.renameTextInLibrary(payload);
     
  }


  async dictionaryReplenish(payload:AddWordJobPayload) : Promise<UserWord>{
      const result = await this.dictionaryRepo.dictionaryReplenish(payload);
      return result;
  }

     async removeFromDictionary(payload:RemoveFromDictionaryobPayload) : Promise<void>{
        await this.dictionaryRepo.removeFromDictionary(payload);
   }
  
   
   async updateDictionaryProgress(payload:updateDictionaryProgressPayload) : Promise<void>{
        await this.dictionaryRepo.updateDictionaryProgress(payload);
   }


     async updateLearnedStatus(payload:updateLearnedStatusPayload) : Promise<void>{
        await this.dictionaryRepo.updateLearnedStatus(payload);
   }

  
     async getAllText(payload:GetUserIdPayload) : Promise<UserText[]>{
       return await this.textRepo.getAllText(payload);
   }

      async getDictionary(payload:GetUserIdPayload) : Promise<UserWord[]>{
       return await this.dictionaryRepo.getDictionary(payload);
   }

}
