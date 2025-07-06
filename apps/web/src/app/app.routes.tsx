 import { RouteObject } from 'react-router-dom'; 
 import { RegisterPage, ResetPasswordPage, LoginPage,HomePage, LibraryPage, DictionaryPage, TranslatorPage } from '@web-fsd';


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
     {
    path: '/',
    element: <HomePage />,
  },

       {
    path: '/library',
    element: <LibraryPage />,
  },

         {
    path: '/dictionary',
    element: <DictionaryPage />,
  },

          {
    path: '/translator',
    element: <TranslatorPage />,
  },

  
  

  
];
