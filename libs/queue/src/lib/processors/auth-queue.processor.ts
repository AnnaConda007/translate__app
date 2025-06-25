import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
 import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES, JOB_NAMES } from '../queue-constants';
import {AuthService} from "@translate--app/auth"

@Processor(QUEUE_NAMES.AUTH_QUEUE)
@Injectable()
export class AuthProcessor {
  constructor(private readonly service: AuthService) {}

  @Process(JOB_NAMES.AUTH)
  async handle(job: Job<{ any:any}>) {
        await this.service.auth()
   }
}
