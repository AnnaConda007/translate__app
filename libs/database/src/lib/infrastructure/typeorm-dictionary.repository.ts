import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { IDictionaryRepository } from '../interfaces/dictionary-provider.interface';
import { User } from '../entities/users-entry.entity';
import { UserWord } from '../entities/user_word-entry.entity';
import { UserText } from '../entities/user_text-entry.entity';
import { AddWordJobPayload } from '../dto/database-reg.dto';

@Injectable()
export class TypeOrmDictionaryRepository implements IDictionaryRepository {
  constructor(
    @InjectRepository(UserWord)
    private readonly userWordRepo: Repository<UserWord>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
 
  ) {}

  async dictionaryReplenish( payload:AddWordJobPayload
  ): Promise<UserWord> {
    const {userId,translation, source} = payload
  const user = await this.userRepo.findOne({ where: { user_id: userId } });
      if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  const entry = this.userWordRepo.create({
    source,
      translation,
      user,
      progress: 0,
      isLearned: false,
  });

   return  await this.userWordRepo.save(entry);
  }
}
