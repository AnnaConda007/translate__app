import { TranslateRegDto } from "../dto/translate.dto";

export interface ITranslateProvider {
  translate(payload:TranslateRegDto): Promise<string>;
}
