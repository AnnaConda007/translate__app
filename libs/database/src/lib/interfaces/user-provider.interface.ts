import { NewUserRegPayload } from '../dto/database-reg.dto';
import { User } from '../entities/users-entry.entity';

export interface ICreateNewUserTableProvider {
  createNewUserTable(payload: NewUserRegPayload): Promise<User>;
}
