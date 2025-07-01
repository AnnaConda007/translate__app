import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { NewUserRegPayload } from '../dto/database-reg.dto';
import { IAuthProvider } from '../interfaces/auth-provider.interface';
import { User } from '../entities/users-entry.entity';
 
@Injectable()
export class TypeOrmUserRepository implements IAuthProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async addNewUser(payload:NewUserRegPayload): Promise<User > {
    const {userId, email,name } = payload
    let user = await this.userRepo.findOne({ where: { user_id: userId } });
    
      user = this.userRepo.create({
        user_id: userId,
        email: email,
        user_name: name,
      });
    return await this.userRepo.save(user);
  
       
  }
}
 