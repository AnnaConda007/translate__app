import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
 import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES, JOB_NAMES } from '../queue-constants';
import { DataBaseService } from '@dataBase';
import {   updateLearnedStatusPayload} from '@dataBase';

@Processor(QUEUE_NAMES.DATABASE_QUEUE)
@Injectable()
export class UpdateLearnedStatusProcessor {
  constructor(private readonly service: DataBaseService) {}

  @Process(JOB_NAMES.UPDATE_LEARNED_STATUS)
  async handle(job: Job<updateLearnedStatusPayload>) {
          await this.service.updateLearnedStatus(job.data)
   }
}
 