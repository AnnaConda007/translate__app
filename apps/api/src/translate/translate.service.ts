 import { Injectable } from '@nestjs/common';
 
@Injectable()
export class TranslateService {
  async translateByYandex(text: string): Promise<string> {
   
    return " ответ от TranslateService";
  }
}
