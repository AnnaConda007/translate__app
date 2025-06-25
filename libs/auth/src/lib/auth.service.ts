 import { Inject, Injectable } from '@nestjs/common'; 
import { IAuthProvider } from './interfaces/auth-provider.interface';

@Injectable()
export class AuthService {
    constructor(
    @Inject('IAuthProvider') private readonly provider: IAuthProvider
  ) {}
 

  async auth(): Promise<any> {
        return this.provider.auth( );

   }
} 