import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../shared/config/firebase-сonfig';  
import { FirebaseError } from 'firebase/app';


export const toLogin = async (email: string, password: string) => {
 try {
     await signInWithEmailAndPassword(auth, email, password);
}   catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message); 
    } else {
      throw new Error('Unknown error during login');
    }

 }  }