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
 

   @Post('create-new-user-table')
  async auth(@Body() body: NewUserRegDto,  @Req() req: Request): Promise<User> {
      const user = req['user'];  
      const userId = user.uid
      const {email,name} = body
       return await this.queueService.addCreateNewUserTableJob({userId,email,name})
    }
       
  @Post('user-library-replenish') async addUserText( @Body() body: AddUserTextRegDto,   @Req() req: Request) :Promise<UserText>{
      const user = req['user'];  
      const userId = user.uid
            const {title,content} = body
      return await this.queueService.addUserLibraryReplenishJob({userId,title,content});
  }

       
  @Post('dictionary-replenish') async addWord( @Body() body: AddWordRegDto,  @Req() req: Request):Promise <UserWord> {
       const user = req['user'];  
       const userId = user.uid
       const {source, translation} = body
      return this.queueService.addDictionaryReplenishJob({userId,source, translation});
  }


   @Get('translate') async translate(@Body()  body:TranslateRegDto ) { 
       const {text} = body
    await this.queueService.addTranslateJob({text});
    return { status: 'added to queue' };
  }
}
