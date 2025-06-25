import { Module } from '@nestjs/common';
 import { ConfigModule } from '@nestjs/config';
 import { AuthService } from './auth.service';
 import { AuthProvider } from './providers/auth.provider';
@Module({
  imports: [ConfigModule],
  providers: [
       {
      provide: 'IAuthProvider',       
      useClass: AuthProvider,     
    },
  
    AuthService,
   ],
  exports: [AuthService],
})
export class AuthModule {}
