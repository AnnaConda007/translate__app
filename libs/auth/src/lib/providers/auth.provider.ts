import { Injectable } from '@nestjs/common';
 import { IAuthProvider } from '../interfaces/auth-provider.interface';


@Injectable()
export class AuthProvider implements IAuthProvider {
 
  async auth( ): Promise<any> { 
    console.log("работает!!!")
  }

   
  
}
