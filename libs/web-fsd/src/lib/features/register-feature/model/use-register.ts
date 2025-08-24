 import { useState } from 'react'; 
import { toRegister } from '../../../entities/user/api/register-api';


export const useRegister = () => {
  const [email, setEmail] = useState('');
    const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);

const submitRegisterForm = async (email: string, name:string,password: string) => {
      setLoading(true);
  
try {
 await toRegister( email,name, password)
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
  error,loading,
    setEmail,
    setPassword,
    submitRegisterForm,name, setName
 
  };
};
