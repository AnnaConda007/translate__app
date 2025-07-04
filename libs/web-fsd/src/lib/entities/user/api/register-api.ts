import { createUserWithEmailAndPassword } from 'firebase/auth';
 import { FirebaseError } from 'firebase/app';
import { auth } from '../../../shared/config/firebase-сonfig';
import { createTablesForUser } from './create-tables-for-user';

export const toRegister = async (
  email: string,
  name: string,
  password: string
): Promise<void> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await userCredential.user.getIdToken(true);
    createTablesForUser(email, name)
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error(error.message);
      throw new Error(error.message);
    }
     throw new Error("Unknown error during registration");
  }
};



 