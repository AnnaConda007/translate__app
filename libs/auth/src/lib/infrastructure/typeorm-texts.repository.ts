import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

 
 import { UserText } from '../entities/user_text-entry.entity';
import { ITextsRepository } from '../interfaces/texts-provider.interface';
@Injectable()
export class TypeOrmTextsRepository implements ITextsRepository {
  constructor(
    

    @InjectRepository(UserText)
    private readonly userTextRepo: Repository<UserText>,
  ) {}

  async addText(userId: string, title: string, content: string): Promise<void> {
 
 
console.log("dd")
 }
}