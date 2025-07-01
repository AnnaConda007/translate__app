  import { AddUserTextRegPayload, RemoveTextPayload, RenaimeTextPayload } from "../dto/database-reg.dto"; 
 import { UserText } from "../entities/user_text-entry.entity";
 
export interface ILibraryRepository {
  userLibraryReplenish(payload:AddUserTextRegPayload): Promise<UserText>;
  removeTextFromUserLibrary(payload:RemoveTextPayload): Promise<void>;
  renameTextInLibrary(payload:RenaimeTextPayload): Promise<void>;

  
}
