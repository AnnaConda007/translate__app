import {  sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../shared/config/firebase-сonfig';  
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';

export const useResetPassword = () => {
const [email, setEmail] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
 const navigate= useNavigate()

const submitResetPasswordForm = (email:string)=>{
    try {
            sendPasswordResetEmail(auth, email) 
      navigate('/auth/login');

    }  catch (error: unknown) {
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
   loading,
    error,
    setEmail,
     submitResetPasswordForm,
 
  };
 
}


