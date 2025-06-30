import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
 import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES, JOB_NAMES } from '../queue-constants';
import { DataBaseService } from '@dataBase';

@Processor(QUEUE_NAMES.ADD_USER_TEXT)
@Injectable()
export class TextsProcessor {
  constructor(private readonly service: DataBaseService) {}

  @Process(JOB_NAMES.DICTIONARY)
  async handle(job: Job<{ userId:string,title: string, content: string }>) {
 const { userId, title,content } = job.data;
       await this.service.addText(userId, title,content)
   }
}
