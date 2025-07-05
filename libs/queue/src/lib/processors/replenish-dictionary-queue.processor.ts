import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
 import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES, JOB_NAMES } from '../queue-constants';
import { DataBaseService } from '@dataBase';
import { AddWordJobPayload } from '@dataBase';
@Processor(QUEUE_NAMES.DATABASE_QUEUE)
@Injectable()
export class AddToDictionaryProcessor {
  constructor(private readonly service: DataBaseService) {}

  @Process(JOB_NAMES.ADD_WORD_TO_DICTIONARY)
  async handle(job: Job<AddWordJobPayload>) {
         await this.service.addWordToDictionary(job.data)
   }
}
 