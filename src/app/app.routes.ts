import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { BlankLayout } from './layouts/blank-layout/blank-layout';
import { Notfound } from './features/pages/notfound/notfound';
import { Login } from './features/auth/components/login/login';
import { Register } from './features/auth/components/register/register';
import { ForgotPassword } from './features/auth/components/forgot-password/forgot-password';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'forgot-password', component: ForgotPassword }
    ]
  },
  { path: 'blank', component: BlankLayout },
  { path: '**', component: Notfound }
];

  