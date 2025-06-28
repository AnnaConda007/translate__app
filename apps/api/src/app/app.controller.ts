import { Controller, Get, Body,Post , Req, UseGuards} from '@nestjs/common';
import {QueueService} from '@queue';
import { Request } from 'express';
 
@Controller()
export class AppController {
  constructor(
    private readonly queueService: QueueService ) {}
/*
   @Post('auth')
  async auth(@Body('text') text: string) {
       await this.queueService.addAuthJob()
   }*/

  @Get('add-word') async addWord( @Body('source') source: string, @Body('translation') translation: string,  @Req() req: Request) {
      const user = req['user'];  
     return this.queueService.addDictionaryJob(11,"зууу", "зукл");
  }


   @Get('translate') async translate(@Body('text') text: string) { 
    console.log("dd")
    await this.queueService.addTranslateJob(text);
    return { status: 'added to queue' };
  }
}
