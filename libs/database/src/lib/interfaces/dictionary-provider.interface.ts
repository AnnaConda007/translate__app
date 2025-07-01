import { AddWordJobPayload } from "../dto/database-reg.dto";
import { UserWord } from "../entities/user_word-entry.entity";

export interface IDictionaryRepository {
  dictionaryReplenish(payload:AddWordJobPayload): Promise<UserWord>;
}
