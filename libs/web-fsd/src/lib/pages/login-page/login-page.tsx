import { useNavigate } from 'react-router-dom';
import { ButtonTextUi } from '../../shared/ui-kit/ui-kit-button/ui-kit-button-text';
import { TextUi } from '../../shared/ui-kit/ui-kit-text/ui-kit-text';
import { LoginWidget } from '../../widgets/login-widget/login-widget';

export const LoginPage = () => {
  const navigate = useNavigate()

  const handleAuth = () =>{
    navigate("/auth/register")
  }
  return (
    <main className='h-full flex justify-center flex-col items-center'>
      <LoginWidget />
      <ButtonTextUi handleButton={handleAuth} value={  "Зарегистрироваться"}  />
       </main>
  )
};
