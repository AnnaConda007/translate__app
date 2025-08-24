import { RouteObject } from 'react-router-dom';
import {
  RegisterPage,
  ResetPasswordPage,
  LoginPage,
  LibraryPage,
  DictionaryPage,
  TranslatorPage,
  ReaderPage,
} from '@web-fsd';
import { TestsPage } from '@web-fsd';
export const appRoutes: RouteObject[] = [
  {
    path: '/auth/login',
    element: <LoginPage />,
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

  {
    path: '/tests',
    element: <TestsPage />,
  },
  {
    path: '/read/:title',
    element: <ReaderPage />,
  },
];
