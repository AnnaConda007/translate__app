import { LoginForm } from '../../features/login-feature/ui/login-form';
import { Link } from 'react-router-dom';

export const LoginWidget = () => {
  return (
    <>
      Войти
      <LoginForm />
      <Link to="/auth/register">Регистарция</Link>
    </>
  );
};
