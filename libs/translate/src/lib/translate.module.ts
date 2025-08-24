import { Module } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { ConfigModule } from '@nestjs/config';
import { YandexTranslateProvider } from './providers/yandex-translate.provider';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [join(__dirname, '../../../../.env')],
    }),
  ],
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
