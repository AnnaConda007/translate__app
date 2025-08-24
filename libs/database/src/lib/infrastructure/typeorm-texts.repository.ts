import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserText } from '../entities/user_text-entry.entity';
import { ILibraryRepository } from '../interfaces/library-provider.interface';
import { User } from '../entities/users-entry.entity';
import {
  AddUserTextRegPayload,
  GetUserIdPayload,
  RemoveTextPayload,
  RenaimeTextPayload,
  TextByTitlePayload,
} from '../dto/database-reg.dto';

@Injectable()
export class TypeOrmTextsRepository implements ILibraryRepository {
  constructor(
    @InjectRepository(UserText)
    private readonly userTextRepo: Repository<UserText>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async addBookToLibrary(payload: AddUserTextRegPayload): Promise<UserText> {
    const { userId, title, content } = payload;
    const user = await this.userRepo.findOne({ where: { user_id: userId } });
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    const newText = this.userTextRepo.create({
      title,
      content,
      user,
    });

    return await this.userTextRepo.save(newText);
  }

  async removeTextFromUserLibrary(
    payload: RemoveTextPayload,
  ): Promise<UserText> {
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

    return await this.userTextRepo.remove(entry);
  }

  async renameTextInLibrary(payload: RenaimeTextPayload): Promise<UserText> {
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

    return await this.userTextRepo.save(entry);
  }

  async getAllText(payload: GetUserIdPayload): Promise<string[]> {
    const { userId } = payload;
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
    const titles = texts.map((text) => text.title);

    return titles;
  }

  async getTextByTitle(payload: TextByTitlePayload): Promise<string> {
    const { userId, title } = payload;

    const user = await this.userRepo.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    const text = await this.userTextRepo.findOne({
      where: {
        user: { id: user.id },
        title: title,
      },
      relations: ['user'],
    });

    if (!text) {
      throw new Error(`Text with title "${title}" not found`);
    }

    return text.content;
  }
}
