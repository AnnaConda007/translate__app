 import { useState } from 'react';
 
import { toLogin } from '../../../entities/user/api/login-api';



export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);

const submitLoginForm = async (email: string, password: string) => {
      setLoading(true);

try {
     await toLogin(  email, password);
} catch (error: unknown) {
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
    password,
   loading,
    error,
    setEmail,
    setPassword,
    submitLoginForm,
 
  };
};
