import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES, JOB_NAMES } from '../queue-constants';
import { DataBaseService } from '@dataBase';
import { AddUserTextRegPayload } from '@dataBase';

@Processor(QUEUE_NAMES.DATABASE_QUEUE)
@Injectable()
export class AddBookToLibrary {
  constructor(private readonly service: DataBaseService) {}

  @Process(JOB_NAMES.ADD_BOOK_TO_LIBRARY)
  async handle(job: Job<AddUserTextRegPayload>) {
    await this.service.addBookToLibrary(job.data);
  }
}
