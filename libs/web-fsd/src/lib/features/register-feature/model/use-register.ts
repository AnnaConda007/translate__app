 import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
 import { FirebaseError } from 'firebase/app';
import { auth } from '../../../shared/config/firebase-сonfig';
export const useRegister = () => {
  const [email, setEmail] = useState('');
    const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);

const submitRegisterForm = async (email: string, name:string,password: string) => {
      setLoading(true);
try {
 const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  await userCredential.user.getIdToken(true); 
    api(email, name)

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

 const api = async(email: string, name:string)=>{
    const user = auth.currentUser
          if (!user) return
      const token =await user.getIdToken()
  fetch('http://localhost:3000/api/create-new-user-table', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',     
              'Authorization': `Bearer ${token}`, 
 },
             body: JSON.stringify({ email, name}),

      });
 }

  return {
    email,
    password,
   loading,
    error,
    setEmail,
    setPassword,
    submitRegisterForm,name, setName
 
  };
};
