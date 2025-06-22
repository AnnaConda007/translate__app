import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
 import { TranslateModule } from '@translate--app/translate'
import { DictionaryModule } from '@translate--app/dictionary';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'translate_app',
      autoLoadEntities: true,
      synchronize: true, // ❗только для разработки
    }),
    TranslateModule,
    DictionaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
