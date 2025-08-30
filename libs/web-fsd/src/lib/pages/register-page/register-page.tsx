import { ButtonTextUi } from '../../shared/ui-kit/ui-kit-button/ui-kit-button-text';
import { RegisterWidget } from '../../widgets/register-widget/register-widget';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
    const navigate = useNavigate()
  
    const handleAuth = () =>{
      navigate("/auth/login")
    }
    return (
      <main className='h-full flex justify-center flex-col items-center'>
        <RegisterWidget />
        <ButtonTextUi handleButton={handleAuth} value={  "Уже есть аккаунт"}  />
         </main>
    )  }