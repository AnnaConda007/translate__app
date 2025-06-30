import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { UserText } from '../entities/user_text-entry.entity';
import { ITextsRepository } from '../interfaces/texts-provider.interface';
import { User } from '../entities/users-entry.entity';
@Injectable()
export class TypeOrmTextsRepository implements ITextsRepository {
  constructor(
    @InjectRepository(UserText)
    private readonly userTextRepo: Repository<UserText>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    
  ) {}

 async addText(userId: string, title: string, content: string): Promise<void> {
  const user = await this.userRepo.findOne({ where: { user_id: userId } });
   if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  const newText = this.userTextRepo.create({
    title,
    content,
    user,
  });
 try {
  const res = await this.userTextRepo.save(newText);
  console.log('SAVED:', res);
} catch (err) {
  console.error('SAVE ERROR:', err);
}

}

}
