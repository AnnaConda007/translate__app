import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ITranslateProvider } from '../interfaces/translate-provider.interface';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { TranslateRegDto } from '../dto/translate.dto';
 import { LanguageCode } from '../models/language-code.enum';

@Injectable()
export class YandexTranslateProvider implements ITranslateProvider {
  constructor(private readonly configService: ConfigService) {}

  async translate(payload:TranslateRegDto): Promise<any> {
    console.log("dd,kmkmlfmlfmfm")
    const yandexApiUrl = 'https://translate.api.cloud.yandex.net/translate/v2/translate'
    const apiKey = this.configService.get<string>('YANDEX_API_KEY');
    const folderId = this.configService.get<string>('YANDEX_FOLDER_ID');
const {  text}= payload
console.log("apiKey", apiKey)
try {
    const response = await axios.post(yandexApiUrl,
      {
        folder_id: folderId,
        texts: [text],
        sourceLanguageCode: "en",
        targetLanguageCode: "ru",
      },
      {
        headers: {
          Authorization: `Api-Key ${apiKey}`,
        },
      }
    );
         return response.data.translations[0].text;


} catch (error) {
     console.error( error)
}
  
  }
}
