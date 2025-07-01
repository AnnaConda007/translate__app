import { Controller, Get, Body,Post , Req, UseGuards} from '@nestjs/common';
import {QueueService} from '@queue';
import { Request } from 'express';
  import { IsEmail, IsString } from 'class-validator';
import { NewUserRegDto, AddUserTextRegDto,AddWordRegDto } from '@dataBase';
 import { TranslateRegDto } from '@translate';
   import { User, UserText, UserWord } from '@dataBase';
@Controller()
export class AppController {
  constructor(
    private readonly queueService: QueueService ) {}
 

   @Post('auth')
  async auth(@Body() body: NewUserRegDto,  @Req() req: Request): Promise<User> {
      const user = req['user'];  
      const userId = user.uid
      const {email,name} = body
       return await this.queueService.addAuthJob({userId,email,name})
    }
       
  @Post('add-user-text') async addUserText( @Body() body: AddUserTextRegDto,   @Req() req: Request) :Promise<UserText>{
      const user = req['user'];  
      const userId = user.uid
            const {title,content} = body
      return await this.queueService.addUserTextJob({userId,title,content});
  }

       
  @Post('add-word') async addWord( @Body() body: AddWordRegDto,  @Req() req: Request):Promise <UserWord> {
       const user = req['user'];  
       const userId = user.uid
       const {source, translation} = body
      return this.queueService.addDictionaryJob({userId,source, translation});
  }


   @Get('translate') async translate(@Body()  body:TranslateRegDto ) { 
       const {text} = body
    await this.queueService.addTranslateJob({text});
    return { status: 'added to queue' };
  }
}
