 import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QUEUE_NAMES,JOB_NAMES } from './queue-constants';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(QUEUE_NAMES.TRANSLATE_QUEUE) private translateQueue: Queue,
    @InjectQueue(QUEUE_NAMES.DICTIONARY_QUEUE) private dictionaryQueue: Queue,
  ) {}

  async addTranslateJob(text: string) {
     await this.translateQueue.add(JOB_NAMES.TRANSLATE, { text });
  }

    async addDictionaryJob(word: string, translation: string) {
 await this.dictionaryQueue.add(JOB_NAMES.DICTIONARY, { word, translation });
  }
}
