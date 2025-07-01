import { AddWordJobPayload } from "../dto/database-reg.dto";
import { UserWord } from "../entities/user_word-entry.entity";

export interface IDictionaryRepository {
  addWord(payload:AddWordJobPayload): Promise<UserWord>;
}
