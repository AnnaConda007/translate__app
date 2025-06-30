import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

 import { IAuthProvider } from '../interfaces/auth-provider.interface';
import { User } from '../entities/users-entry.entity'; 

@Injectable()
export class TypeOrmUserRepository implements IAuthProvider {
  constructor( 

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
 
  ) {}


  async addNewUser(userId: string, email: string,name:string): Promise<void> {

  let user = await this.userRepo.findOne({ where: { user_id: userId } });

  if (!user) {
    user = this.userRepo.create({
      user_id: userId,
      email: email,
      user_name:name

    });
    await this.userRepo.save(user); 
  } 
}


 }
