import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
 import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES, JOB_NAMES } from '../queue-constants';
import { DataBaseService } from '@dataBase';
import { AddWordJobPayload } from '@dataBase';
@Processor(QUEUE_NAMES.DATABASE_QUEUE)
@Injectable()
export class DictionaryProcessor {
  constructor(private readonly service: DataBaseService) {}

  @Process(JOB_NAMES.DICTIONARY_REPLANISH)
  async handle(job: Job<AddWordJobPayload>) {
         await this.service.dictionaryReplenish(job.data)
   }
}
 