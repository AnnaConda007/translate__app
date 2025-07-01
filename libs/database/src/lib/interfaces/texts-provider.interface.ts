  import { AddUserTextRegPayload } from "../dto/database-reg.dto"; 
 import { UserText } from "../entities/user_text-entry.entity";
 
export interface ITextsRepository {
  addText(payload:AddUserTextRegPayload): Promise<UserText>;
}
