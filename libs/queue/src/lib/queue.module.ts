import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './queue.service';
import { TranslateQueueProcessor } from './processors/translate-queue.processor';
import { TranslateModule } from '@translate'; 
import { QUEUE_NAMES } from './queue-constants';
import {DictionaryModule} from '@dictionary'; 
import { DictionaryProcessor } from './processors/dictionary-queue.processor';
import {AuthModule} from "@translate--app/auth"
import { AuthProcessor } from './processors/auth-queue.processor';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue(
      { name: QUEUE_NAMES.TRANSLATE_QUEUE }, 
      { name: QUEUE_NAMES.DICTIONARY_QUEUE },
      { name: QUEUE_NAMES.AUTH_QUEUE }
    ),
    TranslateModule,DictionaryModule, AuthModule
  ],
  providers: [QueueService, TranslateQueueProcessor,DictionaryProcessor,AuthProcessor],
  exports: [QueueService],
})
export class QueueModule {}
