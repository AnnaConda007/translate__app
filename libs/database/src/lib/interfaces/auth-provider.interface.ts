 import { NewUserRegPayload } from "../dto/database-reg.dto";
import { User } from "../entities/users-entry.entity";

export interface IAuthProvider {
  addNewUser(payload:NewUserRegPayload): Promise<User>;
}
