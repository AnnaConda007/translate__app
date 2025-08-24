import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './queue.service';
import { TranslateQueueProcessor } from './processors/translate-queue.processor';
import { TranslateModule } from '@translate';
import { QUEUE_NAMES } from './queue-constants';
import { AddToDictionaryProcessor } from './processors/replenish-dictionary-queue.processor';
import { DataBaseModule } from '@dataBase';
import { СreateNewUserProcessor } from './processors/create-new-user.processor';
import { AddBookToLibrary } from './processors/add-user-text.processor';
import { RemoveFromDictionaryProcessor } from './processors/remove-from-dictionary.processor';
import { UpdateDictionaryProgressProcessor } from './processors/update-dictionary-progress.processor';
import { UpdateLearnedStatusProcessor } from './processors/update-learned-status.processor';
import { RenameTextProcessor } from './processors/rename-text.processor';
import { RemoveTextProcessor } from './processors/remove-text.processor';
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
      { name: QUEUE_NAMES.DATABASE_QUEUE },
    ),
    TranslateModule,
    DataBaseModule,
  ],
  providers: [
    QueueService,
    TranslateQueueProcessor,
    RemoveTextProcessor,
    RenameTextProcessor,
    UpdateLearnedStatusProcessor,
    AddToDictionaryProcessor,
    СreateNewUserProcessor,
    UpdateDictionaryProgressProcessor,
    RemoveFromDictionaryProcessor,
    AddBookToLibrary,
  ],
  exports: [QueueService],
})
export class QueueModule {}
