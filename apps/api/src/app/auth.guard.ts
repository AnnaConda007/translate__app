import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { firebaseAdmin } from './firebase/firebase-admin';
import { Request } from 'express';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
     const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers.authorization;
 
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Нет токена');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = await firebaseAdmin.auth().verifyIdToken(token);
      req['user'] = decoded;  
      console.log(decoded)
      return true;
    } catch (err) {
      throw new UnauthorizedException('Невалидный токен');
    }
  }
}
