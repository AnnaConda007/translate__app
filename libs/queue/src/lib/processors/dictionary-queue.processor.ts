import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { DictionaryService } from '@translate--app/dictionary';
import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES, JOB_NAMES } from '../queue-constants';

@Processor(QUEUE_NAMES.DICTIONARY_QUEUE)
@Injectable()
export class DictionaryProcessor {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Process(JOB_NAMES.DICTIONARY)
  async handle(job: Job<{ userId:number,word: string, translation: string }>) {
 const { userId, word, translation } = job.data;
       await this.dictionaryService.addWord(userId, word,translation)
   }
}
