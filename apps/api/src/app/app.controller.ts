import { Controller, Get, Body,Post , Req} from '@nestjs/common';
import {QueueService} from '@queue';
import { Request } from 'express';
 import { NewUserRegDto, AddUserTextRegDto,AddWordRegDto, removeFromDictionaryResDto, updateDictionaryProgressResDto, updateLearnedStatusResDto, RemoveTextRegDto, RenaimeTextRegDto } from '@dataBase';
 import { TranslateRegDto } from '@translate';
   import { User, UserText, UserWord } from '@dataBase';
import { DataBaseService } from '@dataBase';

@Controller()
export class AppController {
  constructor(
    private readonly queueService: QueueService ,
     private readonly DataBaseService: DataBaseService 
  ) {}
    
 

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

 
    @Post('remove-text-from-user-library') async removeTextFromUserLibrary( @Body() body: RemoveTextRegDto,   @Req() req: Request) :Promise<UserText>{
      const user = req['user'];  
      const userId = user.uid
            const {title} = body
      const dd = await this.queueService.addRemoveTextJob({userId,title});
      return dd
  }


 
      @Post('rename-text-in-library') async renameTextInLibrary( @Body() body: RenaimeTextRegDto,   @Req() req: Request) :Promise<UserText>{
      const user = req['user'];  
      const userId = user.uid
            const {title, newTitle} = body
      return await this.queueService.addRenameTextJob({userId,title,newTitle});
  } 


  @Post('dictionary-replenish') async addWord( @Body() body: AddWordRegDto,  @Req() req: Request):Promise <UserWord> {
       const user = req['user'];  
       const userId = user.uid
       const {source, translation} = body
      return this.queueService.addDictionaryReplenishJob({userId,source, translation});
  }

  @Post('remove-from-dictionary') async removeFromDictionary ( @Body() body: removeFromDictionaryResDto,  @Req() req: Request):  Promise<void>{
       const user = req['user'];  
       const userId = user.uid
       const {word} = body
        this.queueService.addRemoveFromDictionaryJob({userId,word});
  }


    @Post('update-dictionary-progress') async updateDictionaryProgress(  @Body() body: updateDictionaryProgressResDto,   @Req() req: Request): Promise< void>{
       const user = req['user'];  
       const userId = user.uid
       const {progress, word} = body
        this.queueService.addUpdateDictionaryProgressJob({userId,progress, word}, );
  }
 
      @Post('update-dictionary-learned-status') async updateLearnedStatus(  @Body() body: updateLearnedStatusResDto,   @Req() req: Request): Promise< void>{
       const user = req['user'];  
       const userId = user.uid
       const {isLearned, word} = body
        this.queueService.addUpdateLearnedStatusJob({userId,isLearned, word}, );
  } 

   @Post('translate') async translate(@Body()  body:TranslateRegDto ):Promise<string> { 
       const {text} = body
   return  await this.queueService.addTranslateJob({text});
   }



     @Get('get-all-texts') async getAllTexts(  @Req() req: Request ):Promise<string[]> { 
          const user = req['user'];  
       const userId = user.uid
    return  await this.DataBaseService.getAllText({userId});
   
   }


        @Get('get-dictionary') async getDictionart(  @Req() req: Request ):Promise<UserWord[]> { 
          const user = req['user'];  
       const userId = user.uid
    return  await this.DataBaseService.getDictionary({userId});
   
   }

}
