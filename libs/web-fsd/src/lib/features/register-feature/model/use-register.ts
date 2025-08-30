import { useState } from 'react';
import { toRegister } from '../../../entities/user/api/register-api';
 import { InputsRegisterName } from '../../../shared/types/auth-type';
import { setValidate } from '../../../shared/utils/auth-utils';
import { useNavigate } from 'react-router-dom';

 

export const useRegister = () => { 
    const navigate = useNavigate()
  
    
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>("");

  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false); 
  const [nameInvalid, setNameInvalid] = useState(false); 


 const invalidSetters: Record<InputsRegisterName, (b: boolean) => void> = {
    [InputsRegisterName.EMAIL]: setEmailInvalid,
    [InputsRegisterName.NAME]: setNameInvalid,
    [InputsRegisterName.PASSWORD]: setPasswordInvalid,
  };
  
  const isEmpty = (v?: string) => !v || v.trim() === '';

  const validateRequired = (): boolean => {
    const entries: Array<[InputsRegisterName, string]> = [
      [InputsRegisterName.EMAIL, email],
      [InputsRegisterName.NAME, name],
      [InputsRegisterName.PASSWORD, password],
    ];
    let ok = true;
    for (const [key, value] of entries) {
      const invalid = isEmpty(value);
      invalidSetters[key](invalid);
      if (invalid) {ok = false;
                setError("Проверьте поля ввода");

      }
    }
    return ok;
  };

 
   const clearError = (field: InputsRegisterName) => {invalidSetters[field](false)
    setError(null);}


  const submitRegisterForm = async () => {
    if (!validateRequired() || loading) return;  

      setLoading(true);

    try {
await toRegister(email, name, password);
      navigate("/")

     } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError("Что-то пошло не так, попробуйте еще раз");
      }
    } finally {
      setLoading(false);
    }
  };

 
    const handleEmail = (email: string) => {
     setEmail(email);
     setEmailInvalid(false)
       clearError(InputsRegisterName.EMAIL)

  };

  const handlePassword = (password: string) => {
      setPassword(password);
      setPasswordInvalid(false)
            clearError(InputsRegisterName.NAME)

  };

    const handleName = (name: string) => {
      setName(name);
      setNameInvalid(false)
      clearError(InputsRegisterName.NAME)
  };


  return { email,name,error, loading, nameInvalid,password,handleEmail, handleName,handlePassword, submitRegisterForm, passwordInvalid, emailInvalid };
};
