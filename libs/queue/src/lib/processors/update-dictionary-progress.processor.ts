import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES, JOB_NAMES } from '../queue-constants';
import { DataBaseService } from '@dataBase';
import { updateDictionaryProgressPayload } from '@dataBase';

@Processor(QUEUE_NAMES.DATABASE_QUEUE)
@Injectable()
export class UpdateDictionaryProgressProcessor {
  constructor(private readonly service: DataBaseService) {}

  @Process(JOB_NAMES.UPDATE_DICTIONARY_PROGRESS)
  async handle(job: Job<updateDictionaryProgressPayload>) {
    await this.service.updateDictionaryProgress(job.data);
  }
}
