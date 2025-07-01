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
    @InjectQueue(QUEUE_NAMES.DICTIONARY_QUEUE) private dictionaryQueue: Queue,
    @InjectQueue(QUEUE_NAMES.AUTH_QUEUE) private authQueue : Queue,
    @InjectQueue(QUEUE_NAMES.ADD_USER_TEXT) private addUserText : Queue,

    
  ) {}

    async addAuthJob(payload:NewUserRegPayload) {
   const job = await this.authQueue.add(JOB_NAMES.AUTH, payload);
 return await job.finished();   
}



  async addTranslateJob(payload: TranslateRegDto) {
     await this.authQueue.add(JOB_NAMES.TRANSLATE, payload);
  }

    async addDictionaryJob(payload: AddWordJobPayload) {
   const job = await this.dictionaryQueue.add(JOB_NAMES.DICTIONARY,payload);
    return await job.finished();   

  }


      async addUserTextJob(payload:AddUserTextRegPayload) {
           const job =  await this.addUserText.add(JOB_NAMES.ADD_USER_TEXT,payload)
 return await job.finished();   
  }
}
