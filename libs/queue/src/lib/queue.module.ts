import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './queue.service';
import { TranslateQueueProcessor } from './processors/translate-queue.processor';
import { TranslateModule } from '@translate'; 
import { QUEUE_NAMES } from './queue-constants';
 import { DictionaryProcessor } from './processors/dictionary-queue.processor';
import {DataBaseModule} from "@dataBase"
import { AuthProcessor } from './processors/auth-queue.processor';
import { TextsProcessor } from './processors/add-user-text.processor';
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
      { name: QUEUE_NAMES.AUTH_QUEUE },
      { name: QUEUE_NAMES.ADD_USER_TEXT }
    ),
    TranslateModule, DataBaseModule
  ],
  providers: [QueueService, TranslateQueueProcessor,DictionaryProcessor,AuthProcessor, TextsProcessor],
  exports: [QueueService],
})
export class QueueModule {}
