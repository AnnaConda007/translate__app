 
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
 import { DictionaryService } from './dictionary.service';
 import { TypeOrmDictionaryRepository } from './infrastructure/typeorm-dictionary.repository';
import { UserWord } from "./entities/user_word-entry.entity";
import { UserText } from "./entities/user_text-entry.entity";
import { User } from './entities/users-entry.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserWord,UserText,User])],
  providers: [DictionaryService, {
      provide: 'IDictionaryRepository', 
      useClass: TypeOrmDictionaryRepository,
    }],
  exports: [DictionaryService],
})
export class DictionaryModule {}


 