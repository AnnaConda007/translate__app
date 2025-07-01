import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
 import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES, JOB_NAMES } from '../queue-constants';
import { DataBaseService, RenaimeTextPayload } from '@dataBase';
 
@Processor(QUEUE_NAMES.DATABASE_QUEUE)
@Injectable()
export class RenameTextProcessor {
  constructor(private readonly service: DataBaseService) {}

  @Process(JOB_NAMES.RENAME_TEXT)
async handle(job: Job<RenaimeTextPayload>) {
        await this.service.renameTextInLibrary(job.data)
    }
}
