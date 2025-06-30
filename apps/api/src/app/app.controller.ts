import { Controller, Get, Body,Post , Req, UseGuards} from '@nestjs/common';
import {QueueService} from '@queue';
import { Request } from 'express';
 
@Controller()
export class AppController {
  constructor(
    private readonly queueService: QueueService ) {}

   @Post('auth')
  async auth(@Body('email') email, @Body('name') name,  @Req() req: Request) {
      const user = req['user'];  
      const userId = user.uid
       await this.queueService.addAuthJob(userId,email,name)
   }
       
  @Post('add-user-text') async addUserText( @Body('title') title: string, @Body('content') content: string,   @Req() req: Request) {
      const user = req['user'];  
      const userId = user.uid
     return this.queueService.addUserTextJob(userId,title,content);
  }

       
  @Get('add-word') async addWord( @Body('source') source: string, @Body('translation') translation: string,  @Req() req: Request) {
      const user = req['user'];  
      console.log(user)
     return this.queueService.addDictionaryJob("11","зууу", "зукл");
  }


   @Get('translate') async translate(@Body('text') text: string) { 
    console.log("dd")
    await this.queueService.addTranslateJob(text);
    return { status: 'added to queue' };
  }
}
