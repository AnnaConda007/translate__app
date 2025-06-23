import { Inject, Injectable } from '@nestjs/common';
import { ITranslateProvider } from './interfaces/translate-provider.interface';
import { LanguageCode } from './models/language-code.enum';//использовать позже


@Injectable()
export class TranslateService {
  constructor(
    @Inject('ITranslateProvider') private readonly provider: ITranslateProvider
  ) {}

  async translate(text: string, sourceLang: string, targetLang: string): Promise<string> {
    if (!text?.trim()) {
      throw new Error('Пустой текст нельзя перевести');
    }
     return this.provider.translate(text, sourceLang, targetLang);
  }
} 