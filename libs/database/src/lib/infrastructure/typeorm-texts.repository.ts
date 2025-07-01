import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserText } from '../entities/user_text-entry.entity';
import { ILibraryRepository } from '../interfaces/library-provider.interface';
import { User } from '../entities/users-entry.entity';
 import { AddUserTextRegPayload, GetUserIdPayload, RemoveTextPayload, RenaimeTextPayload } from '../dto/database-reg.dto';
 

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


async removeTextFromUserLibrary(payload: RemoveTextPayload): Promise<void> {
  const { userId, title } = payload;

  const user = await this.userRepo.findOne({
    where: { user_id: userId },
  });

  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  const entry = await this.userTextRepo.findOne({
    where: {
      user: { id: user.id },
      title: title,
    },
    relations: ['user'],
  });

  if (!entry) {
    throw new Error(`Text with title "${title}" not found for this user`);
  }

  await this.userTextRepo.remove(entry);

  console.log(`✅ Removed text "${title}" for user ${userId}`);
}



 async renameTextInLibrary(payload: RenaimeTextPayload): Promise<void> {
  const { userId, title, newTitle } = payload;

  const user = await this.userRepo.findOne({
    where: { user_id: userId },
  });

  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  const entry = await this.userTextRepo.findOne({
    where: {
      user: { id: user.id },
      title: title,
    },
    relations: ['user'],
  });

  if (!entry) {
    throw new Error(`Text with title "${title}" not found for this user`);
  }

  entry.title = newTitle;
  await this.userTextRepo.save(entry);

  console.log(`✅ Renamed text "${title}" to "${newTitle}" for user ${userId}`);
}





async getAllText(payload:GetUserIdPayload): Promise<UserText[]> {
  const {userId} = payload
  const user = await this.userRepo.findOne({
    where: { user_id: userId },
  });

  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  const texts = await this.userTextRepo.find({
    where: { user: { id: user.id } },
    relations: ['user'],
  });
   return texts;
}



}
