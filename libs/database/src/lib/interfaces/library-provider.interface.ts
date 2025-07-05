  import { AddUserTextRegPayload, GetUserIdPayload, RemoveTextPayload, RenaimeTextPayload } from "../dto/database-reg.dto"; 
 import { UserText } from "../entities/user_text-entry.entity";
 
export interface ILibraryRepository {
  addBookToLibrary(payload:AddUserTextRegPayload): Promise<UserText>;
  removeTextFromUserLibrary(payload:RemoveTextPayload): Promise<UserText>;
  renameTextInLibrary(payload:RenaimeTextPayload): Promise<UserText>;
getAllText(payload:GetUserIdPayload):Promise<string[]>;



  
}
