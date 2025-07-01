import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
 import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES, JOB_NAMES } from '../queue-constants';
import { DataBaseService } from '@dataBase';
import { AddWordJobPayload } from '@dataBase';
@Processor(QUEUE_NAMES.DICTIONARY_QUEUE)
@Injectable()
export class DictionaryProcessor {
  constructor(private readonly service: DataBaseService) {}

  @Process(JOB_NAMES.DICTIONARY)
  async handle(job: Job<AddWordJobPayload>) {
         await this.service.addWord(job.data)
   }
}
 