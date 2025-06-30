export interface ITextsRepository {
  addText(userId:string, title: string,content: string): Promise<void>;
 }
