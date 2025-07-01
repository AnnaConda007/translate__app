import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
 import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES, JOB_NAMES } from '../queue-constants';
import { DataBaseService } from '@dataBase';
import {   RemoveFromDictionaryobPayload} from '@dataBase';

@Processor(QUEUE_NAMES.DATABASE_QUEUE)
@Injectable()
export class RemoveFromDictionaryProcessor {
  constructor(private readonly service: DataBaseService) {}

  @Process(JOB_NAMES.REMOVE_FROM_DICTONARY)
  async handle(job: Job<RemoveFromDictionaryobPayload>) {
          await this.service.removeFromDictionary(job.data)
   }
}
 