import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
 import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES, JOB_NAMES } from '../queue-constants';
import {DataBaseService} from "@dataBase"

@Processor(QUEUE_NAMES.AUTH_QUEUE)
@Injectable()
export class AuthProcessor {
  constructor(private readonly service: DataBaseService) {}

@Process(JOB_NAMES.AUTH)
async handleAuth(job: Job<{ userId: string; email: string; text: string }>) {
  const { userId, email, text } = job.data;
   return await this.service.auth(userId, email, text);
 
 }
 
}
