import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ITranslateProvider } from '../interfaces/translate-provider.interface';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { TranslateRegDto } from '../dto/translate.dto';

@Injectable()
export class YandexTranslateProvider implements ITranslateProvider {
  constructor(private readonly configService: ConfigService) {}

  async translate(payload: TranslateRegDto): Promise<string> {
    const yandexApiUrl =
      'https://translate.api.cloud.yandex.net/translate/v2/translate';
    const apiKey = this.configService.get<string>('YANDEX_API_KEY');
    const folderId = this.configService.get<string>('YANDEX_FOLDER_ID');
    const { text } = payload;

    try {
      const detected = await this.detectLanguage(text);
      if (!detected) return 'используйте русский или английский язык';

      const { sourceLanguageCode, targetLanguageCode } = detected;

       const chunks = chunkByLength(text, 8000);

      const response = await axios.post(
        yandexApiUrl,
        {
          folderId,                 
          texts: chunks,            
          targetLanguageCode,
          sourceLanguageCode,
        },
        {
          headers: {
            Authorization: `Api-Key ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const pieces: string[] = (response.data?.translations ?? []).map(
        (t: any) => t?.text ?? '',
      );

      return pieces.join('');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async detectLanguage(text: string): Promise<Pair | null> {
    try {
      const yandexApiUrl =
        'https://translate.api.cloud.yandex.net/translate/v2/detect';

      const apiKey = this.configService.get<string>('YANDEX_API_KEY');
      const folderId = this.configService.get<string>('YANDEX_FOLDER_ID');

      // /detect принимает максимум ~1000 символов
      const sample = text.slice(0, 1000);

      const response = await axios.post(
        yandexApiUrl,
        {
          folderId,
          text: sample,
        },
        {
          headers: {
            Authorization: `Api-Key ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const pairMap = {
        ru: { sourceLanguageCode: 'ru', targetLanguageCode: 'en' },
        en: { sourceLanguageCode: 'en', targetLanguageCode: 'ru' },
      } as const;

      type Supported = keyof typeof pairMap; // 'ru' | 'en'

      const languageCode = response.data?.languageCode as Supported | undefined;
      if (!languageCode) return null;

      return pairMap[languageCode];
    } catch (e) {
       return null;
    }
  }
}

interface Pair {
  sourceLanguageCode: string;
  targetLanguageCode: string;
}

 
function chunkByLength(s: string, limit = 8000): string[] {
  if (s.length <= limit) return [s];
  const parts: string[] = [];
  for (let i = 0; i < s.length; i += limit) {
    parts.push(s.slice(i, i + limit));
  }
  return parts;
}
