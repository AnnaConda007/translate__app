 import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QUEUE_NAMES,JOB_NAMES } from './queue-constants';
 import { AddWordJobPayload,NewUserRegPayload,AddUserTextRegPayload, RemoveFromDictionaryobPayload, updateDictionaryProgressPayload, updateLearnedStatusPayload, RemoveTextPayload, RenaimeTextPayload } from '@dataBase';
 import { TranslateRegDto } from '@translate';
 @Injectable()
export class QueueService {
  constructor(
    @InjectQueue(QUEUE_NAMES.TRANSLATE_QUEUE) private translateQueue: Queue,
     @InjectQueue(QUEUE_NAMES.DATABASE_QUEUE) private databaseQueue : Queue, 


    
  ) {}

    async addCreateNewUserTableJob(payload:NewUserRegPayload) {
   const job = await this.databaseQueue.add(JOB_NAMES.CRATE_NEW_USER_TABLE, payload);
 return await job.finished();   
}

   async addAddBookToLibrary(payload:AddUserTextRegPayload) {
           const job =  await this.databaseQueue.add(JOB_NAMES.ADD_BOOK_TO_LIBRARY,payload)
 return await job.finished();   
  }


     async addRemoveTextJob(payload:RemoveTextPayload) {
        const job =   await this.databaseQueue.add(JOB_NAMES.REMOVE_TEXT,payload)
        return await job.finished()
   }


      async addRenameTextJob(payload:RenaimeTextPayload) {
        const job =   await this.databaseQueue.add(JOB_NAMES.RENAME_TEXT,payload)
            return await job.finished();   

   }


    async addAddWordToDictionaryJob(payload: AddWordJobPayload) {
   const job = await this.databaseQueue.add(JOB_NAMES.ADD_WORD_TO_DICTIONARY,payload);
    return await job.finished();   

  }

    async addRemoveFromDictionaryJob(payload: RemoveFromDictionaryobPayload) {
    const job = await this.databaseQueue.add(JOB_NAMES.REMOVE_FROM_DICTONARY,payload);
    return job.finished()
 
  }

      async addUpdateDictionaryProgressJob (payload: updateDictionaryProgressPayload) {
    await this.databaseQueue.add(JOB_NAMES.UPDATE_DICTIONARY_PROGRESS,payload);
 
  }


       async addUpdateLearnedStatusJob (payload: updateLearnedStatusPayload) {
    await this.databaseQueue.add(JOB_NAMES.UPDATE_LEARNED_STATUS,payload);
 
  }





  
  

  
  async addTranslateJob(payload: TranslateRegDto) {
   const job =   await this.translateQueue.add(JOB_NAMES.TRANSLATE, payload);
  return await job.finished();   

  }

  


   
}
