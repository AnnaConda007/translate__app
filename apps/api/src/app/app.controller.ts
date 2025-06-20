import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TranslateService } from '../translate/translate.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly translateService: TranslateService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
    @Get('translate')
  async translate(@Body('text') text: string) {
    const translated = await this.translateService.translateByYandex(text);
    return { translated };
  }
}
