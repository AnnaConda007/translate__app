 import { Controller, Get, Body } from '@nestjs/common';
 import {QueueService} from '@translate--app/queue';
import { DictionaryService } from '@translate--app/dictionary';

@Controller()
export class AppController {
  constructor(
    private readonly queueService: QueueService,
    private readonly dictionaryService: DictionaryService,
  ) {}

  @Get('add-word')
  async addWord(
    @Body('source') source: string,
    @Body('translation') translation: string,
  ) {
     return this.queueService.addDictionaryJob("men", "мужчина");

  }

  @Get('translate')
  async translate(@Body('text') text: string) {
    await this.queueService.addTranslateJob(text);
    return { status: 'added to queue' };
  }
}
