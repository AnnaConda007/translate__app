 import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../shared/config/firebase-сonfig';  
import { FirebaseError } from 'firebase/app';

export const useRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);

const submitRegisterForm = async (email: string, password: string) => {
      setLoading(true);
try {
 await createUserWithEmailAndPassword(auth, email, password)
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
    submitRegisterForm,
 
  };
};
