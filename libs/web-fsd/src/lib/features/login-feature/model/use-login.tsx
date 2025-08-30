 import { useState } from 'react';
import { toLogin } from '../../../entities/user/api/login-api';
import { InputsLoginName } from '../../../shared/types/auth-type';
import { useNavigate } from 'react-router-dom';

const isEmpty = (v?: string) => !v || v.trim() === '';

export const useLogin = () => {
  const navigate = useNavigate()
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

   const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

   const invalidSetters: Record<InputsLoginName, (b: boolean) => void> = {
    [InputsLoginName.EMAIL]: setEmailInvalid,
    [InputsLoginName.PASSWORD]: setPasswordInvalid,
  };

   const validateRequired = (): boolean => {
    const entries: Array<[InputsLoginName, string]> = [
      [InputsLoginName.EMAIL, email],
      [InputsLoginName.PASSWORD, password],
    ];
    let allValid = true;
    for (const [key, value] of entries) {
      const invalid = isEmpty(value);
      invalidSetters[key](invalid);
      if (invalid) {
        allValid = false;
        setError('Проверьте поля ввода');
      }
    }
    return allValid;
  };

   const clearError = (field: InputsLoginName) => {
    invalidSetters[field](false);
    setError(null);
  };

  const submitLoginForm = async () => {
    if (!validateRequired() || loading) return;
    setLoading(true);
    setError(null);
    try {
      await toLogin(email, password);
      navigate("/")
     } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Не удалось войти. Попробуйте ещё раз.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

   const handleEmail = (v: string) => { setEmail(v); if (emailInvalid) setEmailInvalid(false); };
  const handlePassword = (v: string) => { setPassword(v); if (passwordInvalid) setPasswordInvalid(false); };

  return {
     email, password,
     emailInvalid, passwordInvalid,
     loading, error,
     handleEmail, handlePassword,
    clearError,
    submitLoginForm,
  };
};
