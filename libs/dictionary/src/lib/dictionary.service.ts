import { Inject, Injectable } from '@nestjs/common';
 import { IDictionaryRepository } from './interfaces/dictionary-provider.interface';

@Injectable()
export class DictionaryService {
  constructor(
    @Inject('IDictionaryRepository') private readonly repo: IDictionaryRepository,
  ) {}

 async addWord(suserId:number, source: string, translation: string) {
  console.log("добавляем", { suserId, source, translation });

  try {
    const result = await this.repo.addWord(1, "source", "translation");
     return result;
  } catch (error) {
    console.error("Ошибка при сохранении слова:", error);
    throw error;
  }
}


   
}
