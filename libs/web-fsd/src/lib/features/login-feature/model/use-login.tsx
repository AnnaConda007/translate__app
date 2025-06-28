 import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../shared/config/firebase-сonfig';  
import { FirebaseError } from 'firebase/app';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);

const submitLoginForm = async (email: string, password: string) => {
      setLoading(true);
try {
     await signInWithEmailAndPassword(auth, email, password);
} catch (error: unknown) {
  if (error instanceof FirebaseError) {
    console.error(error.message)
    setError(true);
  }  
}
finally {
    setLoading(false);  
  }

 }  


  return {
    email,
    password,
   loading,
    error,
    setEmail,
    setPassword,
    submitLoginForm,
 
  };
};
