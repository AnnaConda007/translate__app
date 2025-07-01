import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { TranslateService } from '@translate';
import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES, JOB_NAMES } from '../queue-constants';
import { TranslateRegDto } from '@translate';  

@Processor(QUEUE_NAMES.TRANSLATE_QUEUE)
@Injectable()
export class TranslateQueueProcessor {
  constructor(private readonly service: TranslateService) {}

  @Process(JOB_NAMES.TRANSLATE)
  async handle(job: Job<TranslateRegDto>) {
    const result = await this.service.translate(job.data );
    return result;
  }
}
