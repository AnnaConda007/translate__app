import { AddWordJobPayload , GetUserIdPayload, RemoveFromDictionaryobPayload, updateDictionaryProgressPayload, updateLearnedStatusPayload} from "../dto/database-reg.dto";
import { UserWord } from "../entities/user_word-entry.entity";


export interface IDictionaryRepository {
  addWordToDictionary(payload:AddWordJobPayload): Promise<UserWord>;
  removeFromDictionary(payload:RemoveFromDictionaryobPayload): Promise<UserWord>;
updateDictionaryProgress(payload:updateDictionaryProgressPayload):Promise<void>

updateLearnedStatus(payload:updateLearnedStatusPayload):Promise<void>



getDictionary(payload:GetUserIdPayload):Promise<UserWord[]>;

}
