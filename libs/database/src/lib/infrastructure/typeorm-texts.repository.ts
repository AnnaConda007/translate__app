import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserText } from '../entities/user_text-entry.entity';
import { ILibraryRepository } from '../interfaces/texts-provider.interface';
import { User } from '../entities/users-entry.entity';
 import { AddUserTextRegPayload } from '../dto/database-reg.dto';
 

@Injectable()
export class TypeOrmTextsRepository implements ILibraryRepository {
  constructor(
    @InjectRepository(UserText)
    private readonly userTextRepo: Repository<UserText>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
  ) {}

 async userLibraryReplenish(payload:AddUserTextRegPayload): Promise<UserText> {
  const {userId,title,content,}= payload
  const user = await this.userRepo.findOne({ where: { user_id: userId } });
   if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  const newText = this.userTextRepo.create({
    title,
    content,
    user,
  });

  return  await this.userTextRepo.save(newText);
   

}

}
