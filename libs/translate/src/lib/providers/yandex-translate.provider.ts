import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ITranslateProvider } from '../interfaces/translate-provider.interface';
import { ConfigService } from '@nestjs/config/dist/config.service';


@Injectable()
export class YandexTranslateProvider implements ITranslateProvider {
  constructor(private readonly configService: ConfigService) {}

  async translate(text: string, sourceLang: string, targetLang: string): Promise<string> {
    const yandexApiUrl = 'https://translate.api.cloud.yandex.net/translate/v2/translate'
    const apiKey = this.configService.get<string>('API_KEY');
    const folderId = this.configService.get<string>('FOLDER_ID');

    const response = await axios.post(yandexApiUrl,
      {
        folder_id: folderId,
        texts: [text],
        sourceLanguageCode: sourceLang,
        targetLanguageCode: targetLang,
      },
      {
        headers: {
          Authorization: `Api-Key ${apiKey}`,
        },
      }
    );

    return response.data.translations[0].text;
  }
}
