import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { TranslateService } from '@translate--app/translate';
import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES, JOB_NAMES } from '../queue-constants';

@Processor(QUEUE_NAMES.TRANSLATE_QUEUE)
@Injectable()
export class TranslateQueueProcessor {
  constructor(private readonly translateService: TranslateService) {}

  @Process(JOB_NAMES.TRANSLATE)
  async handle(job: Job<{ text: string }>) {
    const result = await this.translateService.translate("cat","en","ru" );
    console.log(JOB_NAMES.TRANSLATE, result);
    return result;
  }
}
