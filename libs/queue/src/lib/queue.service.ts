 import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QUEUE_NAMES,JOB_NAMES } from './queue-constants';
 
@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(QUEUE_NAMES.TRANSLATE_QUEUE) private translateQueue: Queue,
    @InjectQueue(QUEUE_NAMES.DICTIONARY_QUEUE) private dictionaryQueue: Queue,
    @InjectQueue(QUEUE_NAMES.AUTH_QUEUE) private authQueue : Queue,
    @InjectQueue(QUEUE_NAMES.ADD_USER_TEXT) private addUserText : Queue,

    
  ) {}

  async addTranslateJob(text: string) {
     await this.authQueue.add(JOB_NAMES.TRANSLATE, { text });
  }

    async addDictionaryJob(userId:string, title: string, content: string) {
 await this.authQueue.add(JOB_NAMES.DICTIONARY, { userId, title, content });
  }

  async addAuthJob(userId: string, email: string, text: string) {
  const job = await this.authQueue.add(JOB_NAMES.AUTH, { userId, email, text });
 return await job.finished();  
  
}


      async addUserTextJob( userId:string,title:string,content:string) {
   await this.addUserText.add(JOB_NAMES.ADD_USER_TEXT, {userId,title,content });
  }
}
