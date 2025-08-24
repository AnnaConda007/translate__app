import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES, JOB_NAMES } from '../queue-constants';
import { DataBaseService } from '@dataBase';
import { RemoveTextPayload } from '@dataBase';

@Processor(QUEUE_NAMES.DATABASE_QUEUE)
@Injectable()
export class RemoveTextProcessor {
  constructor(private readonly service: DataBaseService) {}

  @Process(JOB_NAMES.REMOVE_TEXT)
  async handle(job: Job<RemoveTextPayload>) {
    await this.service.removeTextFromUserLibrary(job.data);
  }
}
