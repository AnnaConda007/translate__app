
import {  sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../shared/config/firebase-сonfig';  
 import { FirebaseError } from 'firebase/app';
  
export const resetPassword = (email:string)=>{
 
    try {
            sendPasswordResetEmail(auth, email) 
 
    }  catch (error: unknown) {
  if (error instanceof FirebaseError) {
    console.error(error.message)
   }  
}
 
}