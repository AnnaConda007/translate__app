 import { Controller, Get, Body } from '@nestjs/common';
 import {QueueService} from '@queue';
 
@Controller()
export class AppController {
  constructor(
    private readonly queueService: QueueService,
   
  ) {}


  @Get('auth')
  async auth(@Body('text') text: string) {
    await this.queueService.addAuthJob()
   }

  @Get('add-word')
  async addWord(
    @Body('source') source: string,
    @Body('translation') translation: string,
  ) {
     return this.queueService.addDictionaryJob(11,"зууу", "зукл");

  }

  @Get('translate')
  async translate(@Body('text') text: string) {
    await this.queueService.addTranslateJob(text);
    return { status: 'added to queue' };
  }
}
