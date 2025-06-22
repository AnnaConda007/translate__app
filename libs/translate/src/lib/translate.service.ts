import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TranslateService {
   private readonly folderId = ' '; 
  private readonly apiKey = ' ';
   async translateByYandex(text: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://translate.api.cloud.yandex.net/translate/v2/translate',
        {
         folder_id: this.folderId,
          texts: ["slat"],
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
       throw new Error('Не удалось перевести текст');
    }
  }
}
