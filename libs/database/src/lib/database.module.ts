import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataBaseService } from './database.service';
import { TypeOrmUserRepository } from './infrastructure/typeorm-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users-entry.entity';
import { UserWord } from './entities/user_word-entry.entity';
import { UserText } from './entities/user_text-entry.entity';
import { TypeOrmTextsRepository } from './infrastructure/typeorm-texts.repository';
import { TypeOrmDictionaryRepository } from './infrastructure/typeorm-dictionary.repository';
 
@Module({
  imports: [TypeOrmModule.forFeature([User, UserWord, UserText]), ConfigModule],
  providers: [
    {
      provide: 'ICreateNewUserTableProvider',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'ILibraryRepository',
      useClass: TypeOrmTextsRepository,
    },
    {
      provide: 'IDictionaryRepository',
      useClass: TypeOrmDictionaryRepository,
    },

    DataBaseService,
  ],
  exports: [DataBaseService],
})
export class DataBaseModule {}
