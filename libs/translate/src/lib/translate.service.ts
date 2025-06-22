import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class TranslateService {
  constructor(private configService: ConfigService) {}

private readonly folderId = this.configService.get<string>('FOLDER_ID');
  private readonly apiKey = this.configService.get<string>('API_KEY');
   async translateByYandex(text: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://translate.api.cloud.yandex.net/translate/v2/translate',
        {
         folder_id: this.folderId,
          texts: ["dog"],
          sourceLanguageCode: 'en',
          targetLanguageCode: 'ru',
        },
        {
          headers: {
            Authorization: `Api-Key ${this.apiKey}`,
          },
        }
      );

      const translatedText = response.data.translations[0].text;
      console.log(translatedText)
      return translatedText;
    } catch (error) {
      console.log(error)
       throw new Error('Не удалось перевести текст');
    }
  }
}
