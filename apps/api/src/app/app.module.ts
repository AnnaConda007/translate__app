import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslateModule } from '@translate'
import { DictionaryModule } from '@dictionary';
import { QueueModule } from '@queue';
import {AuthModule} from '@translate--app/auth'
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [ 
     ConfigModule.forRoot({
      isGlobal: true,  
  envFilePath: [join(__dirname, '../../../../.env')],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'translate_app',
      autoLoadEntities: true,
      synchronize: true, // ❗ 
    }),
    TranslateModule,
    DictionaryModule,
    QueueModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
