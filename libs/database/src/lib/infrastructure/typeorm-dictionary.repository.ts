import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { IDictionaryRepository } from '../interfaces/dictionary-provider.interface';
import { User } from '../entities/users-entry.entity';
import { UserWord } from '../entities/user_word-entry.entity';
import { UserText } from '../entities/user_text-entry.entity';

@Injectable()
export class TypeOrmDictionaryRepository implements IDictionaryRepository {
  constructor(
    @InjectRepository(UserWord)
    private readonly userWordRepo: Repository<UserWord>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(UserText)
    private readonly userTextRepo: Repository<UserText>
  ) {}

  async addWord(
    userId: number,
    source: string,
    translation: string
  ): Promise<void> {
    const user = await this.userRepo.findOneByOrFail({ id: userId });

    const entry = this.userWordRepo.create({
      source,
      translation,
      user,
      progress: 0,
      isLearned: false,
    });

    await this.userWordRepo.save(entry);
  }
}
