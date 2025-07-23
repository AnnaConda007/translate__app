import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IDictionaryRepository } from '../interfaces/dictionary-provider.interface';
import { User } from '../entities/users-entry.entity';
import { UserWord } from '../entities/user_word-entry.entity';
 import { AddWordJobPayload, GetUserIdPayload, RemoveFromDictionaryobPayload, updateDictionaryProgressPayload, updateLearnedStatusPayload } from '../dto/database-reg.dto';

@Injectable()
export class TypeOrmDictionaryRepository implements IDictionaryRepository {
  constructor(
    @InjectRepository(UserWord)
    private readonly userWordRepo: Repository<UserWord>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
 
  ) {}

  async addWordToDictionary( payload:AddWordJobPayload): Promise<UserWord> {
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


async removeFromDictionary(payload: RemoveFromDictionaryobPayload): Promise<UserWord> {
  const { userId, source } = payload;
   const user = await this.userRepo.findOne({ where: { user_id: userId } });
 
  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

   const entry = await this.userWordRepo.findOne({
    where: {
      user: { id: user.id },
      source: source,  
    },
    relations: ['user'],  
  });

   if (!entry) {
     throw new Error(`Word "${source}" not found in user's dictionary`);
  }
 return await this.userWordRepo.remove(entry)
 }



 
async updateDictionaryProgress(payload: updateDictionaryProgressPayload): Promise<void> {
  const { userId, body } = payload;

  
  
   const user = await this.userRepo.findOne({ where: { user_id: userId } });

  
      if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }
          console.log("user",user ,body)


   for (const word of body) {
    console.log("fffff",user.id , word.source)
    const entry = await this.userWordRepo.findOne({
      where: {
        user: { id: user.id },
        source: word.source,
      },
      relations: ['user'],
    });

    if (!entry) {
      console.warn(`Word "${word.source}" not found in user's dictionary`);
      continue;
    }

    entry.progress = word.progress;
    await this.userWordRepo.save(entry);
  }
}



async updateLearnedStatus(payload: updateLearnedStatusPayload): Promise<void> {
  const { userId, word, isLearned } = payload;
   const user = await this.userRepo.findOne({ where: { user_id: userId } });
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

  const entry = await this.userWordRepo.findOne({
  where: {
    user: { id: user.id },
    source: word,  
  },
  relations: ['user'],
});

    if (!entry) {
      throw new Error(`Word "${word}" not found in user's dictionary`);
    }
     entry.isLearned = isLearned;
     await this.userWordRepo.save(entry);
}



 


async getDictionary(payload:GetUserIdPayload): Promise<UserWord[]> {
  const {userId}= payload
  const user = await this.userRepo.findOne({
    where: { user_id: userId },
  });

  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  const words = await this.userWordRepo.find({
    where: { user: { id: user.id } },
    relations: ['user'],
     order: {
     id: 'ASC'  },
  });

  return words;
}



}


  
