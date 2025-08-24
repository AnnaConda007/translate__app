import { Inject, Injectable } from '@nestjs/common';
import { ITranslateProvider } from './interfaces/translate-provider.interface';
import { TranslateRegDto } from './dto/translate.dto';

@Injectable()
export class TranslateService {
  constructor(
    @Inject('ITranslateProvider') private readonly provider: ITranslateProvider,
  ) {}

  async translate(payload: TranslateRegDto): Promise<string | null> {
    return this.provider.translate(payload);
  }
}
