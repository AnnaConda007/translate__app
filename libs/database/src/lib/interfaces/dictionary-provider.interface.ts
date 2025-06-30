export interface IDictionaryRepository {
  addWord(suserId: number, ource: string, translation: string): Promise<void>;
}
