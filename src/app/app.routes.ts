import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cruds',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      },
      {
        path: 'cruds',
        loadChildren: () => import('./views/cruds/routes').then((m) => m.routes)
      },
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'renew',
    loadComponent: () => import('./views/pages/RecoverPassword/recover-password/recover-password.component').then(m => m.RecoverPasswordComponent),

  },

  {
    path: 'confirm',
    loadComponent: () => import('./views/pages/confirm-account/confirm-account.component').then(m => m.ConfirmAccountComponent),

  },

  {
    path: 'reset',
    loadComponent: () => import('./views/pages/resetPassword/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),

  },
  {
    path: 'profile',
    loadComponent: () => import('./views/pages/profile/profile.component').then(m => m.ProfileComponent),
  },
  {
    path: 'send-email',
    loadComponent: () => import('./views/pages/send-email/send-email.component').then(m => m.SendEmailComponent),

  },
  { path: '**', redirectTo: 'therapies' }
];
