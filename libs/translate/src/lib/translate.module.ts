import { Module } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { ConfigModule } from '@nestjs/config';
import { YandexTranslateProvider } from './providers/yandex-translate.provider';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'ITranslateProvider',       
      useClass: YandexTranslateProvider,     
    },
    TranslateService,
    YandexTranslateProvider,  
  ],
  exports: [TranslateService],
})
export class TranslateModule {}
