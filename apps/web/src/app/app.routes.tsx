 import { RouteObject } from 'react-router-dom'; 
import { LoginPage } from '@translate--app/web-fsd';
import { RegisterPage } from '@translate--app/web-fsd';
export const appRoutes: RouteObject[] = [
  {
    path: '/auth/login',
    element: <LoginPage/>,
  },
  {
    path: '/auth/register',
    element: <RegisterPage />,
  },
];
