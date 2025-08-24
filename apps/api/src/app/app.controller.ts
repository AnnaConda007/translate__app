import {
  User,
  UserText,
  UserWord,
  DataBaseService,
  NewUserRegDto,
  AddUserTextRegDto,
  AddWordRegDto,
  removeFromDictionaryResDto,
  updateDictionaryProgressResDto,
  updateLearnedStatusResDto,
  RemoveTextRegDto,
  RenaimeTextRegDto,
  TextByTitleDto,
} from '@dataBase';
import { Controller, Get, Body, Post, Req, Query } from '@nestjs/common';
import { QueueService } from '@queue';
import { TranslateRegDto } from '@translate';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly queueService: QueueService,
    private readonly DataBaseService: DataBaseService,
  ) {}

  @Post('create-new-user-table')
  async auth(@Body() body: NewUserRegDto, @Req() req: Request): Promise<User> {
    const user = req['user'];
    const userId = user.uid;
    const { email, name } = body;
    return await this.queueService.addCreateNewUserTableJob({
      userId,
      email,
      name,
    });
  }

  @Post('add-text-to-library') async addUserText(
    @Body() body: AddUserTextRegDto,
    @Req() req: Request,
  ): Promise<UserText> {
    const user = req['user'];
    const userId = user.uid;
    const { title, content } = body;
    return await this.queueService.addAddBookToLibrary({
      userId,
      title,
      content,
    });
  }

  @Post('remove-text-from-user-library') async removeTextFromUserLibrary(
    @Body() body: RemoveTextRegDto,
    @Req() req: Request,
  ): Promise<UserText> {
    const user = req['user'];
    const userId = user.uid;
    const { title } = body;
    return await this.queueService.addRemoveTextJob({ userId, title });
  }

  @Post('rename-text-in-library') async renameTextInLibrary(
    @Body() body: RenaimeTextRegDto,
    @Req() req: Request,
  ): Promise<UserText> {
    const user = req['user'];
    const userId = user.uid;
    const { title, newTitle } = body;
    return await this.queueService.addRenameTextJob({
      userId,
      title,
      newTitle,
    });
  }

  @Post('add-word-to-dictionary') async addWordToDictionary(
    @Body() body: AddWordRegDto,
    @Req() req: Request,
  ): Promise<UserWord> {
    const user = req['user'];
    const userId = user.uid;
    const { source, translation } = body;
    return this.queueService.addAddWordToDictionaryJob({
      userId,
      source,
      translation,
    });
  }

  @Post('remove-from-dictionary') async removeFromDictionary(
    @Body() body: removeFromDictionaryResDto,
    @Req() req: Request,
  ): Promise<UserWord> {
    const user = req['user'];
    const userId = user.uid;
    const { source } = body;
    return this.queueService.addRemoveFromDictionaryJob({ userId, source });
  }

  @Post('update-dictionary-progress') async updateDictionaryProgress(
    @Body() body: updateDictionaryProgressResDto[],
    @Req() req: Request,
  ): Promise<void> {
    const user = req['user'];
    const userId = user.uid;
    this.queueService.addUpdateDictionaryProgressJob({ userId, body });
  }

  @Post('update-dictionary-learned-status') async updateLearnedStatus(
    @Body() body: updateLearnedStatusResDto,
    @Req() req: Request,
  ): Promise<void> {
    const user = req['user'];
    const userId = user.uid;
    const { isLearned, word } = body;
    this.queueService.addUpdateLearnedStatusJob({ userId, isLearned, word });
  }

  @Post('translate') async translate(
    @Body() body: TranslateRegDto,
  ): Promise<string> {
    const { text } = body;
    return await this.queueService.addTranslateJob({ text });
  }

  @Get('get-all-texts') async getAllTexts(
    @Req() req: Request,
  ): Promise<string[]> {
    const user = req['user'];
    const userId = user.uid;
    return await this.DataBaseService.getAllText({ userId });
  }

  @Get('get-text-by-title') async getTextByTitle(
    @Query() query: TextByTitleDto,
    @Req() req: Request,
  ): Promise<string> {
    const user = req['user'];
    const userId = user.uid;
    const title = query.title;
    return await this.DataBaseService.getTextByTitle({ userId, title });
  }

  @Get('get-dictionary') async getDictionart(
    @Req() req: Request,
  ): Promise<UserWord[]> {
    const user = req['user'];
    const userId = user.uid;
    return await this.DataBaseService.getDictionary({ userId });
  }
}
