 import { RouteObject } from 'react-router-dom'; 
 import { RegisterPage, ResetPasswordPage, LoginPage } from '@translate--app/web-fsd';
export const appRoutes: RouteObject[] = [
  {
    path: '/auth/login',
    element: <LoginPage/>,
  },
  {
    path: '/auth/register',
    element: <RegisterPage />,
  },

   {
    path: '/auth/reset-password',
    element: <ResetPasswordPage />,
  },
  

  
];
