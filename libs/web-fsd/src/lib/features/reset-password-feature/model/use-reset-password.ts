 
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../../entities/user/api/reset-password-api';

export const useResetPassword = () => {
const [email, setEmail] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
 const navigate= useNavigate()

const submitResetPasswordForm = (email:string)=>{
    try {
             resetPassword(  email) 
      navigate('/auth/login');

    }  catch (error: unknown) {
  if (error instanceof Error) {
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


