 import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QUEUE_NAMES,JOB_NAMES } from './queue-constants';
 import { AddWordJobPayload,NewUserRegPayload,AddUserTextRegPayload } from '@dataBase';
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

   async addUserLibraryReplenishJob(payload:AddUserTextRegPayload) {
           const job =  await this.databaseQueue.add(JOB_NAMES.ADD_USER_LIBRARY_REPLANISH,payload)
 return await job.finished();   
  }


    async addDictionaryReplenishJob(payload: AddWordJobPayload) {
   const job = await this.databaseQueue.add(JOB_NAMES.DICTIONARY_REPLANISH,payload);
    return await job.finished();   

  }

  
  async addTranslateJob(payload: TranslateRegDto) {
     await this.translateQueue.add(JOB_NAMES.TRANSLATE, payload);
  }

  


   
}
