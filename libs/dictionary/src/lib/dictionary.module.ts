 
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryEntry } from './dictionary.entity';
import { DictionaryService } from './dictionary.service';

@Module({
  imports: [TypeOrmModule.forFeature([DictionaryEntry])],
  providers: [DictionaryService],
  exports: [DictionaryService],
})
export class DictionaryModule {}


 