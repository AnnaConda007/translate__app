 import { Inject, Injectable } from '@nestjs/common'; 
import { IAuthProvider } from './interfaces/auth-provider.interface';
import { IDictionaryRepository } from './interfaces/dictionary-provider.interface';
import { ITextsRepository } from './interfaces/texts-provider.interface';

@Injectable()
export class DataBaseService {
    constructor(
    @Inject('IAuthProvider') private readonly authRepo: IAuthProvider,
  
     @Inject('IDictionaryRepository') private readonly dictionaryRepo: IDictionaryRepository,
 
     @Inject('ITextsRepository') private readonly textRepo: ITextsRepository,
   ) {}
 

   
  async addText(userId:string, text: string, content: string) {
    try {
     const result = await this.textRepo.addText(userId, text, content);
      return result;
   } catch (error) {
     console.error("Ошибка при сохранении слова:", error);
     throw error;
   }
 }
  async addWord(suserId:number, source: string, translation: string) {
   console.log("добавляем", { suserId, source, translation });
 
   try {
     const result = await this.dictionaryRepo.addWord(1, "source", "translation");
      return result;
   } catch (error) {
     console.error("Ошибка при сохранении слова:", error);
     throw error;
   }
 }
 
 

  async auth(userId:string,email:string,text:string): Promise<any> {
        return this.authRepo.addNewUser( userId,email,text);

   }


} 