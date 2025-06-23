export interface ITranslateProvider {
  translate(text: string, sourceLang: string, targetLang: string): Promise<string>;
}
