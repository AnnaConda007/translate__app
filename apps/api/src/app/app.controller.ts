import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TranslateService }   from '@translate--app/translate'
import { DictionaryService } from '@translate--app/dictionary';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly translateService: TranslateService,
    private readonly dictionaryService: DictionaryService
  ) {}

  
   @Get('addWord')
   async addWord(
    @Body('source') source: string,
    @Body('translation') translation: string,
  ) {
    return this.dictionaryService.addWord("rjirf", "kkkkkk");
  }


    @Get('translate')
  async translate(@Body('text') text: string) {
    const translated = await this.translateService.translateByYandex(text);
    return { translated };
  }
}
