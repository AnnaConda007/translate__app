import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './queue.service';
import { TranslateQueueProcessor } from './processors/translate-queue.processor';
import { TranslateModule } from '@translate--app/translate'; 
import { QUEUE_NAMES } from './queue-constants';
import {DictionaryModule} from '@translate--app/dictionary'; 
import { DictionaryProcessor } from './processors/dictionary-queue.processor';
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
      { name: QUEUE_NAMES.DICTIONARY_QUEUE }
    ),
    TranslateModule,DictionaryModule
  ],
  providers: [QueueService, TranslateQueueProcessor,DictionaryProcessor],
  exports: [QueueService],
})
export class QueueModule {}
