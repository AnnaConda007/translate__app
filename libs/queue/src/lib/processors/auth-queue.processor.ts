import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
 import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES, JOB_NAMES } from '../queue-constants';
import {DataBaseService} from "@dataBase"

@Processor(QUEUE_NAMES.AUTH_QUEUE)
@Injectable()
export class AuthProcessor {
  constructor(private readonly service: DataBaseService) {}

@Process(JOB_NAMES.AUTH)
async handleAuth(job: Job<{ userId: string; email: string; text: string }>) {
  const { userId, email, text } = job.data;

  await this.service.auth(userId, email, text);
}


 @Process(JOB_NAMES.ADD_USER_TEXT)
  async handleUserText(job: Job<{ userId:string,title: string, content: string }>) {
 const { userId, title,content } = job.data;
       await this.service.addText(userId, title,content)
   }

     @Process(JOB_NAMES.DICTIONARY)
  async handleDictionary(job: Job<{ userId:number,word: string, translation: string }>) {
 const { userId, word, translation } = job.data;
       await this.service.addWord(userId, word,translation)
   }
}
