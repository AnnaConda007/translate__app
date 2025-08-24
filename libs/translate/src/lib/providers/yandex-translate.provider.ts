import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ITranslateProvider } from '../interfaces/translate-provider.interface';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { TranslateRegDto } from '../dto/translate.dto';
 
@Injectable()
export class YandexTranslateProvider implements ITranslateProvider {
  constructor(private readonly configService: ConfigService ) {}

  async translate(payload:TranslateRegDto): Promise<string> {
    const yandexApiUrl = 'https://translate.api.cloud.yandex.net/translate/v2/translate'
    const apiKey = this.configService.get<string>('YANDEX_API_KEY');
    const folderId = this.configService.get<string>('YANDEX_FOLDER_ID');
const {  text}= payload
 try {
  
      const detected = await this.detectLanguage(text);
      if(!detected) return "используйте русский или английский язык"
      const {  sourceLanguageCode,  targetLanguageCode } =detected
 

    const response = await axios.post(yandexApiUrl,
      {
        folder_id: folderId,
        texts: [text],
         targetLanguageCode,
         sourceLanguageCode,
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
        throw error; 
}
  
  }


  private async detectLanguage(text: string): Promise<Pair | null> {
  try {
    const yandexApiUrl = "https://translate.api.cloud.yandex.net/translate/v2/detect";

    const apiKey = this.configService.get<string>('YANDEX_API_KEY');
    const folderId = this.configService.get<string>('YANDEX_FOLDER_ID');

    const response = await axios.post(
      yandexApiUrl,
      {
        folderId, 
        text,     
      },
      {
        headers: {
          "Authorization": `Api-Key ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

 

const pairMap = { ru: {
  sourceLanguageCode :"ru",
  targetLanguageCode:"en"
},
 en: {
    sourceLanguageCode :"en",
  targetLanguageCode: "ru"
}};

type Supported = 'en' | 'ru';

    const languageCode : Supported| null = response.data.languageCode 
    if(!languageCode) return null
const lang = pairMap[languageCode];        
return lang
  } catch (e: any) {
     return null;
  }
}

 
}




interface Pair {
    sourceLanguageCode :string;
  targetLanguageCode:string
}