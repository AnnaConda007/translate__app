import { Module } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { ConfigModule } from '@nestjs/config';

@Module({ providers: [TranslateService],
  imports: [ConfigModule] ,
  exports: [TranslateService],})
export class TranslateModule {
    
}
