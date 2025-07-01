  import { AddUserTextRegPayload } from "../dto/database-reg.dto"; 
 import { UserText } from "../entities/user_text-entry.entity";
 
export interface ILibraryRepository {
  userLibraryReplenish(payload:AddUserTextRegPayload): Promise<UserText>;
}
