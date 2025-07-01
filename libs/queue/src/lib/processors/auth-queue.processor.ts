import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
 import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES, JOB_NAMES } from '../queue-constants';
import {DataBaseService} from "@dataBase"
import { NewUserRegPayload } from '@dataBase';

@Processor(QUEUE_NAMES.AUTH_QUEUE)
@Injectable()
export class AuthProcessor {
  constructor(private readonly service: DataBaseService) {}

@Process(JOB_NAMES.AUTH)
async handleAuth(job: Job< NewUserRegPayload>) {
    return await this.service.auth(job.data);
 
 }
 
}
